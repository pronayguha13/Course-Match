import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./auth.module.css";
import {
  formValidationHandler,
  changePasswordView,
} from "../../../helperMethods";
import { BASE_URL } from "../../../Context/AXIOS_BASE_URL";
import { LoginContext } from "../../../Context/LoginContext";
import Loading from "../../Layout/Loading";
import ErrorPage from "../../Layout/ErrorPage";
import SuccessPage from "../../Layout/SuccessPage";

let pause;

const Auth = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rollError, setRollError] = useState(false);
  const [isPwdActive, setIsPwdActive] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const history = useHistory();

  const { setIsLoggedIn } = useContext(LoginContext);

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "roll_number") {
      const enteredRoll = value.trimLeft();
      if (!isNaN(enteredRoll) && enteredRoll.length) {
        setRollError(false);
        setRollNumber(parseInt(enteredRoll));
      } else {
        setRollError(true);
        setRollNumber("");
      }
    } else {
      setPassword(value.trim());
    }
  };

  const _formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      roll_number: rollNumber,
      password: password,
    };

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

  const clearField = () => {
    setRollNumber("");
    setPassword("");
  };

  useEffect(() => {
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
        clearField();
        setError(false);
      }, 1000);
    }
    return () => {
      clearTimeout(pause);
    };
  }, [history, isAuthSuccess, setIsLoggedIn, error, setLoading, setError]);

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
        <h3>Sign in Page</h3>
        <form onSubmit={(e) => _formSubmitHandler(e)}>
          <div className="form-group row">
            <label htmlFor="roll_number" className="col-sm-2 col-form-label">
              University Roll Number
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="roll_number"
                value={rollNumber}
                onChange={(e) => _onChangeHandler(e)}
                style={
                  rollError
                    ? { border: "5px outset #D64933" }
                    : { border: "4px solid #ADEEE3" }
                }
                required
                autoFocus
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type={isHidden ? "password" : "text"}
                className="form-control"
                id="inputPassword3"
                value={password}
                name="password"
                onChange={(e) => _onChangeHandler(e)}
                onFocus={() => setIsPwdActive(true)}
                onBlur={() => setIsPwdActive(false)}
                required
              />
              <img
                src={
                  isHidden
                    ? "/assets/images/icons/eye.png"
                    : "/assets/images/icons/closed-eye.png"
                }
                alt="show-password"
                className={
                  isPwdActive || password.length
                    ? styles.showHidePassword
                    : null
                }
                onClick={() => changePasswordView(isHidden, setIsHidden)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
              <p styles={{ marginTop: "20px" }}>
                {" "}
                if you dont have an account <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
