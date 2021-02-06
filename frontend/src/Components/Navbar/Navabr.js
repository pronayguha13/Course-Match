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
  const { displayMode, setDisplayMode, theme } = useContext(DisplayContext);

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
    <div className={styles.Navbar} style={theme}>
      <Link to="/">
        <p>Course-Match App</p>
      </Link>
      {isLoggedIn ? (
        <button
          className="btn btn-secondary btn-lg"
          aria-disabled="true"
          onClick={() => (isLoggedIn ? _logout() : _login())}
        >
          Log out
        </button>
      ) : null}
      {isLoggedIn ? searchAreaDisplayHandler(showSearch, setShowSearch) : null}
      {displayMode === "light" ? (
        <img
          src="/assets/images/icons/dark.png"
          alt="dark"
          onClick={() => displayModeHandler(displayMode, setDisplayMode)}
        />
      ) : (
        <img
          src="/assets/images/icons/light.png"
          alt="Light"
          onClick={() => displayModeHandler(displayMode, setDisplayMode)}
        />
      )}
    </div>
  );
};

export default Navbar;
