import React, { useContext, useState } from 'react';
import { AppContext } from '../Context';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [columns, setColumns] = useState([]);
  const [df, setDf] = useState([]);

  const {url} = useContext(AppContext);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePreprocessing = async () => {
    if (!file) {
      setResponseMessage('Please select a file first.');
      return;
    }
    try {
      const response = await axios.get(`${url}/api/model`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage(response.data.message);
      setDf(response.data.df);
    } catch (error) {
      setResponseMessage(error.response.data.error || 'Error uploading file.');
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setResponseMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${url}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResponseMessage(response.data.message);
      setColumns(response.data.columns);
    } catch (error) {
      setResponseMessage(error.response.data.error || 'Error uploading file.');
    }
  };

  return (
    <div>
      <h2>Upload Your Dataset</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handlePreprocessing}>Apply Preprocessing</button>

      {responseMessage && <p>{responseMessage}</p>}
      {columns.length > 0 && (
        <div>
          <h3>Columns in the uploaded dataset:</h3>
          <ul>
            {columns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
      )}
      {df.length > 0 && (
        <div>
          <h3>Data in df: </h3>
          <ul>
            {df.map((row, index) => (
              <li key={index}>{row.map((ele, index) => (<p>{ele}</p>))}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
