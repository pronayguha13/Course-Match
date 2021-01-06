import React, { createContext, useState } from "react";
export const DisplayContext = createContext();
export const DisplayMode = ({ children }) => {
  const [displayMode, setDisplayMode] = useState("light");

  return (
    <DisplayContext.Provider
      value={{
        displayMode: displayMode,
        setDisplayMode: setDisplayMode,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};
