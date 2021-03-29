import React from "react";
import styles from "./Menudrawer.module.css";

const Menudrawer = ({ isOpen }) => {
  return (
    <div
      className={styles.MenuDrawerContainer}
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      This is the menu drawer
    </div>
  );
};

export default Menudrawer;
