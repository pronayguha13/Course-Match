import React, { useContext } from "react";
import styles from "./SearchResult.module.css";
import { SearchBarContext } from "../../../Context/SearchBarContext";
import Card from "../StudentInfoCard/Card";
import NotFoundCard from "../NotFoundCard";
const SearchResult = (props) => {
  const { isLoading, searchResult } = useContext(SearchBarContext);
  return (
    <div className={styles.SearchResult}>
      <p>Search Result for: {props.match.params.query}</p>
      {isLoading ? (
        <p>Loading</p>
      ) : searchResult !== undefined &&
        Object(searchResult) &&
        Object.values(searchResult).length ? (
        searchResult.map((student, index) => (
          <div key={index}>
            <Card name={student["name"]} roll_number={student["roll_number"]} />
          </div>
        ))
      ) : (
        <NotFoundCard />
      )}
    </div>
  );
};

export default SearchResult;
