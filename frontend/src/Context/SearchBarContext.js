import React, { createContext, useState } from "react";
import SearchArea from "../Components/Search/SearchArea";

export const SearchBarContext = createContext();
export const SearchBarContextProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(true);

  return (
    <SearchBarContext.Provider
      value={{
        showSearch,
        setShowSearch,
        // searchAreaDisplayHandler,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
