import React, { useContext } from "react";
import { AppContext } from "./Context";
import Home from "./page/Home";

const App = () => {
  const { url } = useContext(AppContext);

  return (
    <div className="overflow-x-hidden antialiased">
      <Home />
    </div>
  );
};

export default App;
