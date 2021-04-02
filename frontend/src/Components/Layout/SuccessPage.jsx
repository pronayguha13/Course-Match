import React, { useEffect } from "react";
import style from "./SuccessPage.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessPage = ({ regSuccess }) => {
  const notify = () =>
    toast.error("🦄 Success!Redirecting...", {
      onClose: () => window.history.pushState("/"),
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    notify();
  }, []);

  return (
    <div
      className={style.infopage}
      style={{ display: regSuccess ? "block" : "none" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SuccessPage;
