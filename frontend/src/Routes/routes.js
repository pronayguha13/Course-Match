import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../Components/App/App";
import auth from "../Components/Authentication/auth";
import Navbar from "../Components/Navbar/Navabr";

const BrowserRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/sign_in" component={auth} />
      </Switch>
    </Router>
  );
};

export default BrowserRoutes;
