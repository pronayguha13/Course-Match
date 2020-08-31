import React, { useContext } from "react";
import "./App.css";
import { searchAreaDisplayHandler } from "../../helperMethods";
import { SearchBarContext } from "../../Context/SearchBarContext";

const App = () => {
  const { showSearch, setShowSearch } = useContext(SearchBarContext);
  return (
    <div className="App">
      <p
        style={{
          display: "inline-block",
          margin: "8px 0px 8px 8px",
        }}
      >
        Course-Match App
      </p>
      <a
        href="/"
        className="btn btn-secondary btn-lg "
        role="button"
        aria-disabled="true"
        style={{
          float: "right",
          height: "40px",
          paddingTop: "4px",
          paddingBottom: "4px",
          marginRight: "5px",
        }}
      >
        Sign up
      </a>
      {searchAreaDisplayHandler(showSearch, setShowSearch)}
    </div>
  );
};

export default App;
