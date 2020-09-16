import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./AXIOS_BASE_URL";
export const SearchBarContext = createContext();
export const SearchBarContextProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const searchHandler = (query) => {
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
      }
    };

    const axiosGetCallHandler = (queryObject) => {
      axios
        .post(`${BASE_URL}/search/`, queryObject)
        .then((res) => {
          console.log("axiosGetCallHandler -> res", res.data.user);
          setSearchResult(res.data.user);
          setIsloading(false);
        })
        .catch((err) => {
          console.log("axiosGetCallHandler -> err", err);
        });
    };
    searchHandler(searchQuery);
  }, [searchQuery]);
  return (
    <SearchBarContext.Provider
      value={{
        showSearch,
        setShowSearch,
        searchQuery,
        setSearchQuery,
        isLoading,
        setIsloading,
        searchResult,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
