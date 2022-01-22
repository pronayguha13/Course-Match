import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Context from "./Context/Context";

import BrowserRoutes from "./Routes/routes";

import App from "./Components/App/App";
ReactDOM.render(
  <React.StrictMode>
    <Context>
      <BrowserRoutes>
        <App />
      </BrowserRoutes>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
