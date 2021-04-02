import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../Context/AXIOS_BASE_URL";
import { formValidationHandler } from "../../../helperMethods";
import { LoginContext } from "../../../Context/LoginContext";
import { DisplayContext } from "../../../Context/DisplayContext";
import Loading from "../../../Components/Layout/Loading.jsx";
import ErrorPage from "../../../Components/Layout/ErrorPage";
import SuccessPage from "../../../Components/Layout/SuccessPage";
import LoginForm from "../../../Components/Forms/Login/LoginForm";
import styles from "./auth.module.css";
let pause; //for timeout

const Auth = () => {
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rollError, setRollError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const { themeSwitcher } = useContext(DisplayContext);
  const { setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    themeSwitcher();
    setLoading(false);
    if (isAuthSuccess) {
      pause = setTimeout(() => {
        setIsAuthSuccess(false);
        setIsLoggedIn(true);
        history.push("/");
      }, 3001);
    }
    return () => {
      clearTimeout(pause);
    };
  }, [themeSwitcher, isAuthSuccess, error, setLoading]);

  const loginFormSubmitHandler = (submittedFormData) => {
    setLoading(true);
    let authError = formValidationHandler(submittedFormData);
    if (authError !== false) {
      setError(true);
      authError === "rollNumber" ? setRollError(true) : setPasswordError(true);
      setShowModal(true);
    } else {
      setShowModal(true);
      axios
        .post(`${BASE_URL}/user/auth`, submittedFormData)
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
      <Loading loading={loading} /> {/* for loader*/}
      {isAuthSuccess && showModal ? (
        <SuccessPage regSuccess={isAuthSuccess} />
      ) : null}
      {error && showModal ? (
        <ErrorPage
          opError={error}
          error={{ info: "Enter Valid Credentials" }}
          setError={setError}
        />
      ) : null}
      <div style={{ opacity: loading || error || isAuthSuccess ? 0.2 : 1 }}>
        <LoginForm
          loginFormSubmitHandler={loginFormSubmitHandler}
          rollError={rollError}
          passwordError={passwordError}
        />
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
