import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "../Components/App/App";
import Auth from "../Components/Authentication/Signin/Auth";
import Navbar from "../Components/Navbar/Navabr";
import Registration from "../Components/Authentication/Registration/Registration";
import { LoginContext } from "../Context/LoginContext";
import axios from "axios";
import { BASE_URL } from "../Context/AXIOS_BASE_URL";
import SearchResult from "../Components/SearchResult/SearchResult";
import Loading from "../Components/Layout/Loading";

const BrowserRoutes = () => {
  const { setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const xAuthToken = window.localStorage.getItem("xAuthToken");
    if (xAuthToken && xAuthToken !== undefined) {
      axios
        .post(`${BASE_URL}/auth/validate`, {
          headers: { "x-auth-token": xAuthToken },
        })
        .then((res) => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          alert(err);
          setIsLoggedIn(false);
        });
    }
  }, [setIsLoggedIn]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute path="/search/:query" component={SearchResult} />
        <Route path="/sign_in" component={Auth} />
        <Route path="/register" component={Registration} />
        <Route path="/logging_in" component={Loading} />
        <PrivateRoute path="/" exact component={App} />
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, loading } = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : loading ? (
          <Redirect
            to={{
              pathname: "/logging_in",
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
            }}
          />
        )
      }
    ></Route>
  );
};

export default BrowserRoutes;
