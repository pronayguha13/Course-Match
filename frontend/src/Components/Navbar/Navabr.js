import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { searchAreaDisplayHandler } from "../../helperMethods";
import { SearchBarContext } from "../../Context/SearchBarContext";

const Navbar = () => {
  const { showSearch, setShowSearch } = useContext(SearchBarContext);
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
      <a
        href="/sign_in"
        className="btn btn-secondary btn-lg "
        role="button"
        aria-disabled="true"
        style={{
          float: "right",
          height: "40px",
          paddingTop: "4px",
          paddingBottom: "4px",
          marginRight: "5px",
        }}
      >
        Sign in
      </a>
      {searchAreaDisplayHandler(showSearch, setShowSearch)}
    </div>
  );
};

export default Navbar;
