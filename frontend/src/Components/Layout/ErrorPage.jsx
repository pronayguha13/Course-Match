import React from "react";
import style from "./SuccessPage.module.css";

const ErrorPage = ({ opError, error }) => {
  return (
    <div
      className={style.infopage}
      style={{ display: opError ? "block" : "none" }}
    >
      <p>{error.info}</p>
    </div>
  );
};

export default ErrorPage;
