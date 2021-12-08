import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UseUser } from "./context/useUser"

ReactDOM.render(
  <React.StrictMode>
    <UseUser>
      <App />
    </UseUser>
  </React.StrictMode>,
  document.getElementById("root")
);
