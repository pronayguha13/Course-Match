import React, {useContext, useEffect} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "Context/AXIOS_BASE_URL";
import {LoginContext} from "Context/LoginContext";
import {MenuDrawerContext} from "Context/MenuDrawer";

import App from "Components/App/App";
import LoginPage from "Containers/Authentication/Signin/LoginPage.jsx";
import Navbar from "Components/Navbar/Navbar.jsx";
import Registration from "Containers/Authentication/Registration/RegistrationPage.jsx";
import SearchResult from "Components/Layout/SearchResult/SearchResult";
import CourseDetailsForm from "Components/Forms/Registration/CourseDetailsForm";
import LandingPage from "Components/LandingPage/LandingPage";
import Footer from "Components/Footer/Footer.jsx";
import MenuDrawer from "Components/Menudrawer/Menudrawer.jsx";
import UserProfile from "Components/UserProfile/index";

const BrowserRoutes = () => {
    const {setIsLoggedIn} = useContext(LoginContext);
    const {isMenuDrawerOpen} = useContext(MenuDrawerContext);

    useEffect(() => {
        const xAuthToken = window.localStorage.getItem("xAuthToken");
        if (xAuthToken) {
            axios
                .post(`${BASE_URL}/auth/validate`, {
                    headers: {"x-auth-token": xAuthToken},
                })
                .then((res) => {
                    console.log("=>(routes.js:42) res", res);
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
            <Navbar/>
            <MenuDrawer isOpen={isMenuDrawerOpen}/>
            <Switch>
                <PrivateRoute path="/user/:username" component={UserProfile}/>
                <PrivateRoute path="/search/:query" component={SearchResult}/>
                <Route path="/sign_in" component={LoginPage}/>
                <Route path="/register" component={Registration}/>
                <Route
                    path="/courseSelection/:userName"
                    component={CourseDetailsForm}
                />
                <Route path="/index" exact component={LandingPage}/>
                <PrivateHomeRoute path="/" exact component={App}/>
            </Switch>
            <footer>
                <Footer/>
            </footer>
        </Router>
    );
};

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(LoginContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
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

const PrivateHomeRoute = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(LoginContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/index",
                        }}
                    />
                )
            }
        ></Route>
    );
};
export default BrowserRoutes;
