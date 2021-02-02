import React from "react";
import style from "./SuccessPage.module.css";

const SuccessPage = ({ regSuccess }) => {
  return (
    <div
      className={style.infopage}
      style={{ display: regSuccess ? "block" : "block" }}
    >
      <p>Success!Redirecting...</p>
    </div>
  );
};

export default SuccessPage;
