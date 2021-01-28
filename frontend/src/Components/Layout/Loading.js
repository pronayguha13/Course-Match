import React from "react";
import style from "./Loading.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Loading = ({ loading }) => {
  return loading ? (
    <div className={style.LoadingCard}>
      <Loader
        type="Watch"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  ) : null;
};

export default Loading;
