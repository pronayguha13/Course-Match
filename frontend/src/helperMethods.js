import React from "react";
import axios from "axios";
import SearchArea from "./Components/Navbar/Search/SearchArea";
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

export const formValidationHandler = (formData) => {
  const rollNumberRegEx = /^1[0-9]{1}9[0-9]{8}/;
  const { password, roll_number } = formData;
  return password.length >= 8 && password.length <= 16
    ? String(roll_number).match(rollNumberRegEx)
      ? false
      : "roll Number"
    : "password";
};

export const RegistrationFormSubmitHandler = (
  formData,
  regStateHandler,
  setLoading
) => {
  setLoading(true);
  axios
    .post(`${BASE_URL}/user`, formData)
    .then((res) => {
      console.log("🚀 ~ file: helperMethods.js ~ line 38 ~ .then ~ res", res);
      window.localStorage.setItem("xAuthToken", res.data.token);
      window.localStorage.setItem("user", res.data.user);
      regStateHandler(true);
      setLoading(false);
    })
    .catch((err) => {
      if (err.response) {
        console.log(
          "🚀 ~ file: helperMethods.js ~ line 44 ~ err",
          err.response.data.ERR_STATUS,
          err.response.data.ERR_INFO
        );
      }
      regStateHandler(false);
      setLoading(false);
    });
};

export const getUserCount = (setCount) => {
  axios
    .get(`${BASE_URL}/index/`)
    .then((res) => {
      setCount(res.data.count);
    })
    .catch((err) => {
      console.log(err);
    });
};

//display mode handler
export const displayModeHandler = (displayMode, setDisplayMode) => {
  displayMode === "dark" ? setDisplayMode("light") : setDisplayMode("dark");
};

//password view change handler
export const changePasswordView = (isHidden, setIsHidden) => {
  const currentViewState = isHidden;
  setIsHidden(!currentViewState);
};

//method for fetching list of departments
export const getDepartments = (setDepartments) => {
  let departments = [];
  axios
    .get(`${BASE_URL}/department/get`)
    .then((res) => {
      res.data.dept.map((d) => {
        departments.push(d.dept_code);
      });
      console.log(
        "🚀 ~ file: helperMethods.js ~ line 87 ~ res.data.dept.map ~ departments",
        departments
      );

      setDepartments(departments);
    })
    .catch((err) => {
      setDepartments([]);
    });
};
