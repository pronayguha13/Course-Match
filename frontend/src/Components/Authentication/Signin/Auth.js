import React, { useState, useEffect } from "react";
import styles from "./auth.module.css";
import { Link, useHistory } from "react-router-dom";
import { formValidationHandler } from "../../../helperMethods";
import axios from "axios";
import { BASE_URL } from "../../../Context/AXIOS_BASE_URL";
const Auth = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const _onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "roll_number") {
      const enteredRoll = value.trimLeft();
      enteredRoll.length
        ? setRollNumber(parseInt(enteredRoll))
        : console.log("_onChangeHnadler -> enteredRoll", enteredRoll);
    } else {
      setPassword(value.trim());
    }
  };

  const _formSubmitHandler = (e) => {
    e.preventDefault();
    const signInForm = {
      roll_number: rollNumber,
      password: password,
    };
    const isValidated = formValidationHandler(signInForm, "sign_in");
    console.log("_formSubmitHandler -> isValidated", isValidated);
    isValidated !== false
      ? setError(isValidated)
      : axios
          .post(`${BASE_URL}/user/auth`, signInForm)
          .then((res) => {
            console.log("loginFormSubmitHandler -> res", res.data);
            setIsLoggedIn(true);
          })
          .catch((err) => {
            console.log("loginFormSubmitHandler -> err", err.response.data);
          });
  };

  useEffect(() => {
    isLoggedin ? history.push("/") : console.log(null);
  }, [isLoggedin, history]);
  return (
    <div className={styles.SignIn}>
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
              required
              autoFocus
            />
            {error === "roll Number" ? (
              <small id="passwordHelpBlock" className="form-text text-muted">
                Please enter valid University roll number
              </small>
            ) : null}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              value={password}
              name="password"
              onChange={(e) => _onChangeHandler(e)}
              required
            />
            {error === "password" ? (
              <small id="passwordHelpBlock" className="form-text text-muted">
                Your password must be 8-16 characters long, contain letters and
                numbers, and must not contain spaces,and emoji.
              </small>
            ) : null}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
            <p>
              {" "}
              if you dont have an account <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
