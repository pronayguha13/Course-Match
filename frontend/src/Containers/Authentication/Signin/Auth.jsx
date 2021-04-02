import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./auth.module.css";
import { formValidationHandler } from "../../../helperMethods";
import { BASE_URL } from "../../../Context/AXIOS_BASE_URL";
import { LoginContext } from "../../../Context/LoginContext";
import { DisplayContext } from "../../../Context/DisplayContext";
import Loading from "../../../Components/Layout/Loading.jsx";
import ErrorPage from "../../../Components/Layout/ErrorPage";
import SuccessPage from "../../../Components/Layout/SuccessPage";
import LoginForm from "../../../Components/Forms/Login/LoginForm";
let pause;

const Auth = () => {
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const { setIsLoggedIn } = useContext(LoginContext);
  const { themeSwitcher } = useContext(DisplayContext);

  useEffect(() => {
    themeSwitcher();
    if (isAuthSuccess) {
      setLoading(false);
      pause = setTimeout(() => {
        setIsAuthSuccess(false);
        setIsLoggedIn(true);
        history.push("/");
      }, 2000);
    } else if (error) {
      setLoading(false);
      pause = setTimeout(() => {
        // clearField();
        setError(false);
      }, 1000);
    }
    return () => {
      clearTimeout(pause);
    };
  }, [
    themeSwitcher,
    history,
    isAuthSuccess,
    setIsLoggedIn,
    error,
    setLoading,
    setError,
  ]);

  const loginFormSubmitHandler = (formData) => {
    setFormData(formData);
    setLoading(true);
    let authError = formValidationHandler(formData);

    if (authError !== false) {
      setError(true);
      setShowModal(true);
    } else {
      setShowModal(true);
      axios
        .post(`${BASE_URL}/user/auth`, formData)
        .then((res) => {
          window.localStorage.setItem("xAuthToken", res.data.token);
          window.localStorage.setItem("user", res.data.user);
          setIsAuthSuccess(true);
        })
        .catch((err) => {
          setError(true);
        });
    }
  };

  return (
    <div className={styles.SignIn}>
      <Loading loading={loading} />
      {isAuthSuccess && showModal ? (
        <SuccessPage regSuccess={isAuthSuccess} />
      ) : null}
      {error && showModal ? (
        <ErrorPage
          opError={error}
          error={{ info: "Enter Valid Credentials" }}
        />
      ) : null}

      <div style={{ opacity: loading || error || isAuthSuccess ? 0.2 : 1 }}>
        <LoginForm loginFormSubmitHandler={loginFormSubmitHandler} />
        <Link to="/register">
          <button className={`${styles.SignUpBtn} btn btn-success`}>
            {" "}
            Create an account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
