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
const Auth = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rollError, setRollError] = useState(false);
  const [isPwdActive, setIsPwdActive] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn, loading, setLoading } = useContext(
    LoginContext
  );

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
    const signInForm = {
      roll_number: rollNumber,
      password: password,
    };
    let isValidated = formValidationHandler(signInForm, "sign_in");
    isValidated !== false
      ? setError(isValidated)
      : axios
          .post(`${BASE_URL}/user/auth`, signInForm)
          .then((res) => {
            window.localStorage.setItem("xAuthToken", res.data.token);
            window.localStorage.setItem("user", res.data.user);
            setIsLoggedIn(true);
            setLoading(false);
          })
          .catch((err) => {
            setError(true);
            setLoading(false);
          });
  };

  // const loaderHandler = () => {
  //   if (error) {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (isLoggedIn) history.push("/");
    if (error) {
      setLoading(false);
    }
  }, [isLoggedIn, history, error, setLoading]);

  return (
    <div className={styles.SignIn}>
      <Loading loading={loading} />
      <div style={{ opacity: loading ? 0.2 : 1 }}>
        <h3>Sign in Page</h3>
        <form onSubmit={_formSubmitHandler}>
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
              {error !== null ? (
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Please enter valid credential
                </small>
              ) : null}
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
