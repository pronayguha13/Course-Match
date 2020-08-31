import React, { createContext, useState } from "react";

export const SearchBarContext = createContext();
export const SearchBarContextProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(true);

  return (
    <SearchBarContext.Provider
      value={{
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
