import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";
import {
  searchAreaDisplayHandler,
  displayModeHandler,
} from "../../helperMethods";
import { SearchBarContext } from "../../Context/SearchBarContext";
import { LoginContext } from "../../Context/LoginContext";
import { DisplayContext } from "../../Context/DisplayContext";
import { MenuDrawerContext } from "../../Context/MenuDrawer";

const Navbar = () => {
  const history = useHistory();
  const { isMenuDrawerOpen, menuDrawerHandler } = useContext(MenuDrawerContext);
  const { showSearch, setShowSearch } = useContext(SearchBarContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { displayMode, setDisplayMode, theme } = useContext(DisplayContext);

  const _logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
  };

  const _login = () => {
    history.push("/sign_in");
  };

  useEffect(() => {
    if (isLoggedIn) history.push("/index");
  }, [isLoggedIn, history]);

  return (
    <div className={styles.Navbar}>
      <span className={styles.CompanyLogoWrapper}>
        <Link to={isLoggedIn ? "/index" : "/"} style={{ width: "60px" }}>
          <img
            src="/coursematch.png"
            alt="logo"
            className={styles.companyLogo}
          />
        </Link>
      </span>
      <div className={styles.navigatorButton}>
        {isLoggedIn
          ? searchAreaDisplayHandler(showSearch, setShowSearch)
          : null}
        {isLoggedIn ? (
          <img
            title="Sign out"
            src="/assets/images/icons/logout_black_36dp.svg"
            alt="sign-out"
            onClick={() => _logout()}
          />
        ) : null}
        <span
          onClick={() => {
            menuDrawerHandler();
          }}
        >
          <img
            src="/assets/images/icons/menu_black_24dp.svg"
            alt="hamburger-menu-open"
            className={styles.MenuDrawer}
          />
        </span>
        {/* {displayMode === "light" ? (
        <img
          src="/assets/images/icons/menu_black_24dp.svg"
          alt="dark"
          onClick={() => displayModeHandler(displayMode, setDisplayMode)}
        />
      ) : (
        <img
          src="/assets/images/icons/menu_black_24dp.svg"
          alt="Light"
          onClick={() => displayModeHandler(displayMode, setDisplayMode)}
        />
      )} */}
      </div>
    </div>
  );
};

export default Navbar;
