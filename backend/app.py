from flask import Flask, request, jsonify
import os
from flask_cors import CORS  
from utils.file_handler import save_file, load_csv
from utils.preprocessing import preprocess_data
from models.train_model import train_model

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  

recent_file_path = None

@app.route('/api/upload', methods=['POST'])
def upload_file():
    global recent_file_path

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        recent_file_path = save_file(file, app.config['UPLOAD_FOLDER'])
        df = load_csv(recent_file_path)
        return jsonify({"message": "File uploaded successfully", "columns": list(df.columns)}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/preprocessing', methods=['GET'])
def handle_preprocessing():
    global recent_file_path

    if not recent_file_path:
        return jsonify({"error": "No file uploaded to preprocess"}), 400

    try:
        df = load_csv(recent_file_path)
        df_processed, label_encoders, scaler = preprocess_data(df)
        return jsonify({"message": "Preprocessing completed", "df": list(df_processed.head)}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/model', methods=['GET'])
def create_models():
    global recent_file_path

    if not recent_file_path:
        return jsonify({"error": "No file uploaded to model"}), 400
    
    target_column = request.args.get('target_column')
    print(target_column)
    try:
        df = load_csv(recent_file_path)
        data = train_model(df, target_column)
        return jsonify({"message": "Model creation completed", "data": data}), 200
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Server is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
