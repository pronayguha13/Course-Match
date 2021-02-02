import React, { useContext } from "react";
import styles from "./App.module.css";
import HomePage from "../HomePage/HomePage";
import { DisplayContext } from "../../Context/DisplayContext";
const App = () => {
  const { displayMode, theme } = useContext(DisplayContext);

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
