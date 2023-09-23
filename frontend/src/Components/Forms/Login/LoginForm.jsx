import React, { useState } from "react";
import { changePasswordView } from "../../../helperMethods";
import styles from "./LoginForm.module.css";

const LoginForm = ({
  loading,
  rollError,
  passwordError,
  loginFormSubmitHandler,
}) => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [rollFocus, setRollFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const errorPlaceHolderStyle = {
    color: "red",
  };
  const errorInputStyle = {
    borderBottom: "2px solid red",
    color: "red",
  };

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "roll_number") {
      const enteredRoll = value.trimLeft();
      if (!isNaN(enteredRoll)) {
        enteredRoll.length
          ? setRollNumber(parseInt(enteredRoll))
          : setRollNumber("");
      } else {
        setRollNumber("");
      }
    } else {
      setPassword(value.trim());
    }
  };

  //formDataHandler() method for sending form data from LoginForm.jsx to Auth.jsx
  const formDataHandler = (e) => {
    e.preventDefault();
    if (loading) return; //!If the form is loading then don't do anything

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
              style={rollError ? errorPlaceHolderStyle : null}
              onClick={() => setRollFocus(true)}
            >
              <p> Roll Number</p>
            </span>
            <input
              type="text"
              className={styles.RollNumberInput}
              name="roll_number"
              value={rollNumber}
              placeholder={rollFocus ? "Enter Roll Number" : ""}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => {
                setRollFocus(true);
              }}
              onBlur={() => {
                setRollFocus(false);
              }}
              required
              style={rollError ? errorInputStyle : null}
            />
          </div>
          <div className={styles.inputDiv}>
            <span
              className={
                passwordFocus || password.length
                  ? styles.smallPasswordPlaceholderText
                  : styles.passwordPlaceholderText
              }
              style={passwordError ? errorPlaceHolderStyle : null}
              onClick={() => setPasswordFocus(true)}
            >
              <p> Password</p>
            </span>
            <input
              type={isHidden ? "password" : "text"}
              className={styles.PasswordInput}
              id="inputPassword3"
              value={password}
              name="password"
              placeholder={passwordFocus ? "Enter Password" : ""}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
              style={passwordError ? errorInputStyle : null}
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
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={formDataHandler}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
