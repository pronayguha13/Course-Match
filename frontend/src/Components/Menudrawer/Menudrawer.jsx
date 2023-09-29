import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import styles from "./Menudrawer.module.css";
import { MenuDrawerContext } from "../../Context/MenuDrawer";
import { LoginContext } from "Context/LoginContext";
const Menudrawer = ({ isOpen }) => {
  const history = useHistory();
  const location = useLocation();

  const [menus, setMenus] = useState([]);

  /*--------Method Declaration----------*/
  const computeAvailableRoute = () => {
    const availableRoutes = ["/", "/sign_in", "/register"];

    const currentLocation = location.pathname;

    const currentlyAvailableRoutes = availableRoutes.filter(
      (route) => route !== currentLocation
    );

    return currentlyAvailableRoutes;
  };

  const generateMenuItems = () => {
    let menuItems = menus.map((menu) => {
      switch (menu) {
        case "/":
          return (
            <span className={styles.MenuItem}>
              <Link to="/">
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
  const { isMenuDrawerOpen, setIsMenuDrawerOpen } =
    useContext(MenuDrawerContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

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
