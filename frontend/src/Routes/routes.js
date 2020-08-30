import React from "react";
import { BrowserRouter as router, generatePath, Route } from "react-router-dom";
import App from "../Components/App/App";

const Routes = () => {
  return (
    <div>
      <router>
        <Route path="/" exact component={App} />
      </router>
    </div>
  );
};

export default Routes;
