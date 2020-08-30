import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App";
import { SearchBarContextProvider } from "./Context/SearchBarContext";
ReactDOM.render(
  <React.StrictMode>
    <SearchBarContextProvider>
      <App />
    </SearchBarContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
