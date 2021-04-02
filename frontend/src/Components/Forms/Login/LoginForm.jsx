import React, { useState, useEffect } from "react";
import { changePasswordView } from "../../../helperMethods";
import styles from "./LoginForm.module.css";

const LoginForm = ({ loginFormSubmitHandler }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rollError, setRollError] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [rollFocus, setRollFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
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

  //formDataHandler() method for sending form data from LoginForm.jsx to Auth.jsx
  const formDataHandler = (e) => {
    e.preventDefault();
    const formData = {
      rollNumber: rollNumber,
      password: password,
    };
    loginFormSubmitHandler(formData);
  };

  return (
    <div className={styles.LoginFormContainer}>
      <form className={styles.LoginForm} onSubmit={(e) => formDataHandler(e)}>
        <div className={styles.inputSection}>
          <div className={styles.inputDiv}>
            <span
              className={
                rollNumber || rollNumber.length || rollFocus
                  ? styles.smallRollNumberPlaceholderText
                  : styles.rollNumberPlaceholderText
              }
            >
              <p> Enter Roll Number</p>
            </span>
            <input
              type="text"
              className={styles.RollNumberInput}
              name="roll_number"
              value={rollNumber}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => {
                setRollFocus(true);
              }}
              onBlur={() => {
                setRollFocus(false);
              }}
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <span
              className={
                passwordFocus || password.length
                  ? styles.smallPasswordPlaceholderText
                  : styles.passwordPlaceholderText
              }
            >
              <p> Enter Password</p>
            </span>
            <input
              type={isHidden ? "password" : "text"}
              className={styles.PasswordInput}
              id="inputPassword3"
              value={password}
              name="password"
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
            />
            {password.length ? (
              <img
                src={
                  isHidden
                    ? "/assets/images/icons/LoginForm/eye.svg"
                    : "/assets/images/icons/LoginForm/visibility_off_black_24dp.svg"
                }
                alt="show-password"
                className={styles.showHidePassword}
                onClick={() => changePasswordView(isHidden, setIsHidden)}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.SignInButtonContainer}>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
