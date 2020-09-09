import React, { useContext, useState } from "react";
import styles from "./SearchArea.module.css";
import { SearchBarContext } from "../../Context/SearchBarContext";
import { withRouter } from "react-router-dom";
// import { searchHandler } from "../../helperMethods";
const SearchArea = (props) => {
  const [state, setState] = useState("");
  const { setShowSearch, setSearchQuery } = useContext(SearchBarContext);

  const _searchInputChangeHandler = (e) => {
    setState(e.target.value);
  };

  const searchHandler = (query) => {
    setSearchQuery(query);
    props.history.push(`/search/${query}`);
  };

  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        name="searchInput"
        value={state}
        placeholder="Search your Folks..."
        onChange={(e) => _searchInputChangeHandler(e)}
      />
      {state && state.length ? (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            searchHandler(state.trim());
            setState("");
          }}
          style={{
            height: 29,
            borderRadius: 0,
            marginBottom: "4px",
            textAlign: "center",
          }}
        >
          Search
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => setShowSearch(true)}
          style={{
            height: 29,
            borderRadius: 0,
            // backgroundColor: "#fff",
            // marginLeft: "10px",
            marginBottom: "4px",
            textAlign: "center",
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default withRouter(SearchArea);
