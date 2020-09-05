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
    .post(`${BASE_URL}/search/`, queryObject)
    .then((res) => {
      console.log("axiosGetCallHandler -> res.data:>>", res.data);
    })
    .catch((err) => {
      console.log("axiosGetCallHandler -> err", err);
    });
};

export const formValidationHandler = (formData, redirectingPage) => {
  const rollNumberRegEx = /^169[0-9]{8}/;
  if (redirectingPage === "Registration") {
    const { name, email, password, roll_number } = formData;
    console.log("formValidationHandler -> roll_number", roll_number);
    console.log("formValidationHandler -> password", password);
    console.log("formValidationHandler -> email", email);
    console.log("formValidationHandler -> name", name);
    return password.length > 8 && password.length <= 16
      ? String(roll_number).match(rollNumberRegEx)
        ? null
        : "roll Number"
      : "password";
  }
};

export const RegistrationFormSubmitHandler = (
  formData,
  cb,
  regStateHandler
) => {
  axios
    .post(`${BASE_URL}/user`, formData)
    .then((res) => {
      console.log("RegistrationFormSubmitHandler -> res", res);
      cb(true);
      regStateHandler();
    })
    .catch((err) => {
      console.log("RegistrationFormSubmitHandler -> err", err);
      cb(false);
      regStateHandler();
    });
};
