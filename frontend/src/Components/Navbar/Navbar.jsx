/*----- Third Party Imports --------*/
import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
/*----- Third Party Imports --------*/
/*----- Context Imports --------*/
import { LoginContext } from "../../Context/LoginContext";
import { MenuDrawerContext } from "../../Context/MenuDrawer";
/*----- Context Imports --------*/
/*------Local Component Import --------*/
import SearchArea from "./Search/SearchArea";
/*------Local Component Import --------*/
/*------Stylesheet Import --------*/
import styles from "./Navbar.module.css";
/*------Stylesheet Import --------*/

const Navbar = () => {
  const history = useHistory();
  const { menuDrawerHandler } = useContext(MenuDrawerContext);
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [isLoggedIn, history]);

  return (
    <div className={styles.Navbar}>
      <span className={styles.CompanyLogoWrapper}>
        <Link to="/" style={{ width: "32px" }}>
          <img
            src="/coursematch.png"
            alt="logo"
            className={styles.companyLogo}
          />
        </Link>
      </span>
      <div className={styles.navigatorButton}>
        {isLoggedIn ? <SearchArea /> : null}
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
      </div>
    </div>
  );
};

export default Navbar;
