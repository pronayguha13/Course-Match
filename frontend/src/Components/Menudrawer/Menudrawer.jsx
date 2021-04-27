import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "./Menudrawer.module.css";
import { MenuDrawerContext } from "../../Context/MenuDrawer";
import { LoginContext } from "Context/LoginContext";
const Menudrawer = ({ isOpen }) => {
  const history = useHistory();
  useEffect(() => {
    history.listen(() => {
      setIsMenuDrawerOpen(false);
    });
  }, [history]);
  const { isMenuDrawerOpen, setIsMenuDrawerOpen } = useContext(
    MenuDrawerContext
  );
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const _logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
  };
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
      <div className={styles.MenuItems}>
        <span className={styles.MenuItem}>
          <Link to="/">
            <img src="/assets/images/icons/MenuDrawer/home_white_36dp.svg"></img>
            <p>Home</p>
          </Link>
        </span>
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
        <span className={styles.MenuItem}>
          <Link to="/register">
            <img src="/assets/images/icons/MenuDrawer/registration_white_36dp.svg"></img>
            <p>Register</p>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Menudrawer;
