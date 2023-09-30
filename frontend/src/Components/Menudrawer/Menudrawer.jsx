import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import styles from "./Menudrawer.module.css";
import { MenuDrawerContext } from "../../Context/MenuDrawer";
import { LoginContext } from "Context/LoginContext";
const Menudrawer = ({ isOpen }) => {
  const history = useHistory();
  const location = useLocation();
  const { setIsMenuDrawerOpen } =
    useContext(MenuDrawerContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [menus, setMenus] = useState([]);

  /*--------Method Declaration----------*/
  const computeAvailableRoute = () => {
    const availableRoutes = ["/", "/index", "/sign_in", "/register"];

    const currentLocation = location.pathname;

    //! Remove the Register route if the user is logged in
    if(isLoggedIn) {
      availableRoutes.splice(3,1);
    }

    const filteredRoutes = availableRoutes.filter(
      (route) => route !== currentLocation
    );
    let currentlyAvailableRoutes = filteredRoutes;

    const homePageIndex = filteredRoutes.indexOf("/");
    const landingPageIndex = filteredRoutes.indexOf("/index");

    if (homePageIndex === -1 && landingPageIndex !== -1) {
      currentlyAvailableRoutes.splice(landingPageIndex, 1);
    }
    if (landingPageIndex === -1 && homePageIndex !== -1) {
      currentlyAvailableRoutes.splice(homePageIndex, 1);
    }

    if (homePageIndex !== -1 && landingPageIndex !== -1) {
      //! Choose wisely you will never run into this scenario until you are logged out
      //! In that case strip out the homePageIndex
      currentlyAvailableRoutes.splice(homePageIndex, 1);
    }

    return currentlyAvailableRoutes;
  };

  const generateMenuItems = () => {
    let menuItems = menus.map((menu) => {
      switch (menu) {
        case "/":
        case "/index":
          return (
            <span className={styles.MenuItem}>
              <Link to={`${menu}`}>
                <img src="/assets/images/icons/MenuDrawer/home_white_36dp.svg"></img>
                <p>Home</p>
              </Link>
            </span>
          );
        case "/sign_in":
          return (
            <span className={styles.MenuItem}>
              {!isLoggedIn ? (
                <Link to="/sign_in">
                  <img src="/assets/images/icons/MenuDrawer/login_white_36dp.svg"></img>
                  <p>Log in</p>
                </Link>
              ) : (
                <Link
                  to="#"
                  className={styles.logOutBtnContainer}
                  onClick={() => {
                    _logout();
                  }}
                >
                  <img
                    src="/assets/images/icons/MenuDrawer/logout_white_36dp.svg"
                    alt="sign out"
                  />
                  <p>Log Out</p>
                </Link>
              )}
            </span>
          );
        case "/register":
          return (
            <span className={styles.MenuItem}>
              <Link to="/register">
                <img src="/assets/images/icons/MenuDrawer/registration_white_36dp.svg"></img>
                <p>Register</p>
              </Link>
            </span>
          );
      }
    });

    return menuItems;
  };
  /*--------Method DEclaration----------*/
  useEffect(() => {
    history.listen(() => {
      setIsMenuDrawerOpen(false);
    });
  }, [history]);

  const _logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setMenus(computeAvailableRoute());
  }, [location.pathname]);

  return (
    <div
      className={
        isOpen
          ? styles.MenuDrawerContainerOpen
          : styles.MenuDrawerContainerClose
      }
    >
      <span
        className={styles.MenuDrawerCloseButton}
        onClick={() => setIsMenuDrawerOpen(false)}
      >
        <img
          src="/assets/images/icons/MenuDrawer/close.svg"
          alt="closeMenuDrawer"
        />
      </span>
      <div className={styles.MenuItems}>{generateMenuItems()}</div>
    </div>
  );
};

export default Menudrawer;
