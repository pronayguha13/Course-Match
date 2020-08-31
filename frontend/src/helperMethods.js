import React from "react";
import axios from "axios";
import SearchArea from "./Components/Search/SearchArea";
import { BASE_URL } from "./Context/AXIOS_BASE_URL";

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

export const searchHandler = (query) => {
  if (query.length) {
    let queryObject;
    isNaN(parseInt(query))
      ? (queryObject = {
          name: query,
        })
      : (queryObject = {
          studentID: parseInt(query),
        });

    axiosGetCallHandler(queryObject);
  } else console.log("Invalid query");
};

const axiosGetCallHandler = (queryObject) => {
  axios
    .post(`${BASE_URL}search/`, queryObject)
    .then((res) => {
      console.log("axiosGetCallHandler -> res.data:>>", res.data);
    })
    .catch((err) => {
      console.log("axiosGetCallHandler -> err", err);
    });
};
