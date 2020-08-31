import React from "react";

import SearchArea from "./Components/Search/SearchArea";

export const searchAreaDisplayHandler = (showSearch, setShowSearch) => {
  return !showSearch ? (
    <SearchArea />
  ) : (
    <img
      src="./assets/images/icons/search-glass.png"
      alt="magnifying-glass"
      style={{ color: "#fff", marginRight: "10px" }}
      onClick={() => setShowSearch(false)}
    />
  );
};