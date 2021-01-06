import React from "react";
import axios from "axios";
import SearchArea from "./Components/Search/SearchArea";
import { BASE_URL } from "./Context/AXIOS_BASE_URL";

export const searchAreaDisplayHandler = (showSearch, setShowSearch) => {
  return !showSearch ? (
    <SearchArea />
  ) : (
    <img
      src="/assets/images/icons/search-glass.png"
      alt="magnifying-glass"
      style={{ color: "#fff", marginRight: "10px" }}
      onClick={() => setShowSearch(false)}
    />
  );
};

export const formValidationHandler = (formData, redirectingPage) => {
  const rollNumberRegEx = /^1[0-9]{1}9[0-9]{8}/;
  const { password, roll_number } = formData;
  if (redirectingPage === "Registration") {
    return password.length > 8 && password.length <= 16
      ? String(roll_number).match(rollNumberRegEx)
        ? false
        : "roll Number"
      : "password";
  }
  return password.length > 8 && password.length <= 16
    ? String(roll_number).match(rollNumberRegEx)
      ? false
      : "roll Number"
    : "password";
};

export const RegistrationFormSubmitHandler = (formData, regStateHandler) => {
  axios
    .post(`${BASE_URL}/user`, formData)
    .then((res) => {
      window.localStorage.setItem("xAuthToken", res.data.token);
      window.localStorage.setItem("user", res.data.user);
      regStateHandler(true);
    })
    .catch((err) => {
      regStateHandler(false);
    });
};

export const getUserCount = (setCount) => {
  axios
    .get(`${BASE_URL}/index`)
    .then((res) => {
      console.log(
        "🚀 ~ file: helperMethods.js ~ line 53 ~ .then ~ res",
        res.data.count
      );
      setCount(res.data.count);
    })
    .catch((err) => {
      console.log(err);
    });
};

//display mode handler
export const displayModeHandler = (displayMode) => {
  displayMode === "dark" ? console.log("Dark Mode") : console.log("Light Mode");
};
