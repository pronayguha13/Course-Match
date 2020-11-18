import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./auth.module.css";
import { formValidationHandler } from "../../../helperMethods";
import { BASE_URL } from "../../../Context/AXIOS_BASE_URL";
import { LoginContext } from "../../../Context/LoginContext";

const Auth = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

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
    let isValidated = formValidationHandler(signInForm, "sign_in");
    isValidated !== false
      ? setError(isValidated)
      : axios
          .post(`${BASE_URL}/user/auth`, signInForm)
          .then((res) => {
            window.localStorage.setItem("xAuthToken", res.data.token);
            window.localStorage.setItem("user", res.data.user);
            setIsLoggedIn(true);
          })
          .catch((err) => {
            setError(true);
          });
  };

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [isLoggedIn, history]);

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
            <p style={{ marginTop: "20px" }}>
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
