import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./Components/App/App";
import { SearchBarContextProvider } from "./Context/SearchBarContext";
import { Login } from "./Context/LoginContext";
import { DisplayMode } from "./Context/DisplayContext";
import BrowserRoutes from "./Routes/routes";
ReactDOM.render(
  <React.StrictMode>
    <DisplayMode>
      <Login>
        <SearchBarContextProvider>
          <BrowserRoutes>
            <App />
          </BrowserRoutes>
        </SearchBarContextProvider>
      </Login>
    </DisplayMode>
  </React.StrictMode>,
  document.getElementById("root")
);
