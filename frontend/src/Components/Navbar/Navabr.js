import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";
import {
  searchAreaDisplayHandler,
  displayModeHandler,
} from "../../helperMethods";
import { SearchBarContext } from "../../Context/SearchBarContext";
import { LoginContext } from "../../Context/LoginContext";
import { DisplayContext } from "../../Context/DisplayContext";

const Navbar = () => {
  const history = useHistory();
  const { showSearch, setShowSearch } = useContext(SearchBarContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { displayMode, setDisplayMode } = useContext(DisplayContext);

  const _logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
  };

  const _login = () => {
    history.push("/sign_in");
  };

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [isLoggedIn, history]);
  return (
    <div className={styles.Navbar}>
      <Link to="/">
        <p
          style={{
            display: "inline-block",
            margin: "8px 0px 8px 8px",
          }}
        >
          Course-Match App
        </p>
      </Link>
      <button
        className="btn btn-secondary btn-lg"
        aria-disabled="true"
        style={{
          float: "right",
          height: "40px",
          paddingTop: "4px",
          paddingBottom: "4px",
          marginRight: "5px",
        }}
        onClick={() => (isLoggedIn ? _logout() : _login())}
      >
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
      {searchAreaDisplayHandler(showSearch, setShowSearch)}
      <img
        src="/assets/images/icons/dark.png"
        alt="dark"
        onClick={() => displayModeHandler(displayMode)}
      />
    </div>
  );
};

export default Navbar;
