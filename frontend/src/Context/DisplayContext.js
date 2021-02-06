import React, { createContext, useState } from "react";
export const DisplayContext = createContext();
export const DisplayMode = ({ children }) => {
  const [displayMode, setDisplayMode] = useState("dark");
  const Dark = {
    backgroundColor: "#000",
    color: "#fff",
  };

  const Light = {
    backgroundColor: "#fff",
    color: "#000",
  };
  const theme = displayMode === "dark" ? Dark : Light;

  const themeSwitcher = () => {
    if (displayMode === "dark") {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  };

  return (
    <DisplayContext.Provider
      value={{
        displayMode: displayMode,
        setDisplayMode: setDisplayMode,
        theme: theme,
        themeSwitcher: themeSwitcher,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};
