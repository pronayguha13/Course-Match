import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
import { fetchUserDetails } from "../../helperMethods";

const HomePage = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const authToken = window.localStorage.getItem("xAuthToken");
    fetchUserDetails(authToken, setUserData);
  }, []);
  return (
    <div className={style.HomePageContainer}>
      <div className={style.bodySection}>
        <div className={style.UtilitySection}>
          {" "}
          <h2>Available Options</h2>
          <div className={style.CurrSemCourseSelection}>
            <h3>Select Course for current semester</h3>
          </div>
          <div className={style.FriendCourseSelection}>
            <h3>Check out course your friends are taking this semester</h3>
          </div>
        </div>
        <div className={style.UserDetailsSection}>
          <h2>User Details</h2>
          <div className={style.AccountDetails}>
            <img src="/assets/images/icons/dark.png" alt="avatar" />
            <div className={style.UserPersonalDetails}></div>
            <Link to={`/user/${userData.name}`}>
              <p>Name: {userData.name}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
