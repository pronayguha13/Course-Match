import React, { useContext } from "react";
import styles from "./App.module.css";
import HomePage from "../HomePage/HomePage";
import { DisplayContext } from "../../Context/DisplayContext";
import { MenuDrawerContext } from "../../Context/MenuDrawer";

const App = () => {
  const { displayMode, theme } = useContext(DisplayContext);
  const { setIsMenuDrawerOpen } = useContext(MenuDrawerContext);

  console.log("🚀 ~ file: App.js ~ line 9 ~ App ~ displayMode", displayMode);
  return (
    <div
      className={displayMode === "light" ? styles.Dark : styles.Light}
      style={theme}
    >
      <HomePage />
    </div>
  );
};

export default App;
