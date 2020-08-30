import React, { useState, useContext } from "react";
import "./App.css";
import SearchArea from "../Search/SearchArea";
import { searchAreaDisplayHandler } from "../../helperMethods";
import { SearchBarContext } from "../../Context/SearchBarContext";

const App = () => {
  const { showSearch, setShowSearch } = useContext(SearchBarContext);
  return (
    <div className="App">
      <p
        style={{
          display: "inline-block",
        }}
      >
        Course-Match App
      </p>
      <button style={{ float: "right" }}>Sign In</button>
      {searchAreaDisplayHandler(showSearch, setShowSearch)}
    </div>
  );
};

export default App;
