import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App";
import { SearchBarContextProvider } from "./Context/SearchBarContext";
import BrowserRoutes from "./Routes/routes";
ReactDOM.render(
  <React.StrictMode>
    <SearchBarContextProvider>
      <BrowserRoutes>
        <App />
      </BrowserRoutes>
    </SearchBarContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
