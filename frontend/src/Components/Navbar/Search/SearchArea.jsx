import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./SearchArea.module.css";
import { SearchBarContext } from "../../../Context/SearchBarContext";

const SearchArea = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchQuery } = useContext(SearchBarContext);

  const _searchInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const searchHandler = (query) => {
    setSearchQuery(query);
    props.history.push(`/search/${query}`);
  };
  /**
   * @description Function to handle the click on the search icon in the navigation search input
   */
  const handleSearchButtonClick = () => {
    if (inputValue.length) {
      searchHandler(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        name="searchInput"
        value={inputValue}
        placeholder="Search your Folks..."
        onChange={(e) => _searchInputChangeHandler(e)}
      />
      <img
        src="/assets/images/icons/icons8-search-client-24.png"
        alt="magnifying-glass"
        style={{
          height: "24px",
          width: "24px",
          marginRight: ".25rem",
          cursor: `${inputValue.length ? "pointer" : "not-allowed"}`,
        }}
        onClick={() => handleSearchButtonClick()}
      />
    </div>
  );
};

export default withRouter(SearchArea);
