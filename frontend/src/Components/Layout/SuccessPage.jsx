import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessPage = ({ regSuccess }) => {
  const notify = () =>
    toast.success("🦄 Success!Redirecting...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    notify();
  }, []);

  return (
    <div style={{ display: regSuccess ? "block" : "none" }}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SuccessPage;
