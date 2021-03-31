import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "./Menudrawer.module.css";
import { MenuDrawerContext } from "../../Context/MenuDrawer";
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
          <Link to="/sign_in">
            <img src="/assets/images/icons/MenuDrawer/login_white_36dp.svg"></img>
            <p>Log in</p>
          </Link>
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
