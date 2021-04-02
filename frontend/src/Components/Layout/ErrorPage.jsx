import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorPage = ({ opError, error, setError }) => {
  const notify = () =>
    toast.error(`🦄 ${error.info}`, {
      onClose: () => setError(false),
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
    <div style={{ display: opError ? "block" : "none" }}>
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

export default ErrorPage;
