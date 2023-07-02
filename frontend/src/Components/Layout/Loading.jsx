import React from "react";
import style from "./Loading.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Watch} from "react-loader-spinner";

const Loading = ({loading}) => {
    return loading ? (
        <div className={style.LoadingCard}>
            <Watch
                type="Watch"
                color="#00BFFF"
                height={100}
                width={100}
                visible={!!loading}
            />
        </div>
    ) : null;
};

export default Loading;
