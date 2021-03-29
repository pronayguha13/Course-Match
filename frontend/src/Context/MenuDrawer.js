import React, { createContext, useState } from "react";
export const MenuDrawerContext = createContext();

export const MenuDrawer = ({ children }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  return (
    <MenuDrawerContext.Provider
      value={{
        isMenuDrawerOpen: isMenuDrawerOpen,
        setIsMenuDrawerOpen: setIsMenuDrawerOpen,
      }}
    >
      {children}
    </MenuDrawerContext.Provider>
  );
};
