import React, { useContext, useState } from "react";
import styles from "./SearchArea.module.css";
import { SearchBarContext } from "../../Context/SearchBarContext";
const SearchArea = () => {
  const [state, setState] = useState("");
  const { setShowSearch } = useContext(SearchBarContext);

  const searchInputHandler = (e) => {
    console.log("searchInputHandler -> name", e.target.name);
    console.log("searchInputHandler -> value", e.target.value);
    setState(e.target.value);
  };

  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        name="searchInput"
        value={state}
        onChange={(e) => searchInputHandler(e)}
        style={{ outline: "none", border: "none" }}
      />
      <button onClick={() => setShowSearch(true)}>X</button>
    </div>
  );
};

export default SearchArea;
