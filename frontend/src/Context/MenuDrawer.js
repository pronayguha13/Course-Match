import React, { createContext, useState, useEffect } from "react";
export const MenuDrawerContext = createContext();
export const MenuDrawer = ({ children }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const menuDrawerHandler = () => {
    let menuDrawerStatus = isMenuDrawerOpen;
    let newMenuDrawerStatus = !menuDrawerStatus;
    setIsMenuDrawerOpen(newMenuDrawerStatus);
  };

  return (
    <MenuDrawerContext.Provider
      value={{
        isMenuDrawerOpen: isMenuDrawerOpen,
        setIsMenuDrawerOpen: setIsMenuDrawerOpen,
        menuDrawerHandler: menuDrawerHandler,
      }}
    >
      {children}
    </MenuDrawerContext.Provider>
  );
};
