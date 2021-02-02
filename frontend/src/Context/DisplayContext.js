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

  return (
    <DisplayContext.Provider
      value={{
        displayMode: displayMode,
        setDisplayMode: setDisplayMode,
        theme: theme,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};
