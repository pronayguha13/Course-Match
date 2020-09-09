import React, { useContext } from "react";
import styles from "./SearchResult.module.css";
import { SearchBarContext } from "../../Context/SearchBarContext";
const SearchResult = (props) => {
  const { isLoading, setIsLoading, searchResult } = useContext(
    SearchBarContext
  );
  return (
    <div className={styles.SearchResult}>
      <p>Search Result for: {props.match.params.query}</p>
      {isLoading ? (
        <p>Loading</p>
      ) : Object(searchResult) && Object.values(searchResult).length ? (
        Object.values(searchResult).map((student, index) => (
          <div key={index}>
            <p>name:{student}</p>
            <p>{student.roll_number}</p>
          </div>
        ))
      ) : (
        <p>No Friend Found!Check your Details </p>
      )}
    </div>
  );
};

export default SearchResult;
