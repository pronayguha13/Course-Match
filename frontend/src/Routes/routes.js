import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../Components/App/App";
import Auth from "../Components/Authentication/Signin/Auth";
import Navbar from "../Components/Navbar/Navabr";
import Registration from "../Components/Authentication/Registration/Registration";

const BrowserRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/sign_in" component={Auth} />
        <Route path="/register" component={Registration} />
      </Switch>
    </Router>
  );
};

export default BrowserRoutes;

// const PrivateRoutes = ()=>{

// }
