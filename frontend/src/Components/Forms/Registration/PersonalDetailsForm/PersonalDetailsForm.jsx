import React, { useEffect, useState } from "react";
import styles from "./PersonalDetailsForm.module.css";
import {
  formValidationHandler,
  changePasswordView,
  passwordVerificationHandler,
} from "helperMethods";

import ErrorPage from "Components/Layout/ErrorPage";
let pause;

const PersonalDetailsForm = ({
  error,
  onActiveHandler,
  loading,
  isRegistrationSuccess,
  isRegistrationError,
  setError,
  setPersonalData,
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [roll_number, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPwd, setVerificationPwd] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isNameActive, setIsNameActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isRollActive, SetIsRollActive] = useState(false);
  const [isPwdActive, SetIsPwdActive] = useState(false);
  const [isVerifyPwdActive, SetIsVerifyPwdActive] = useState(false);

  useEffect(() => {
    if (isValidationError) {
      pause = setTimeout(() => {
        setIsValidationError(false);
        setError(null);
      }, 2000);
    }
    return () => {
      clearTimeout(pause);
    };
  }, [isValidationError]);

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        setUserName(value.trimLeft());
        break;
      case "email":
        setEmail(value.trimLeft());
        break;
      case "password":
        setPassword(value.trimLeft());
        break;
      case "verifyPassword":
        setVerificationPwd(value.trimLeft());
        break;
      default:
        const roll = value.trimLeft();
        roll.length ? setRollNumber(roll) : setRollNumber("");
        break;
    }
  };

  const validationHandler = () => {
    if (passwordVerificationHandler(password, verificationPwd)) {
      let errorField = formValidationHandler({ roll_number, password });
      if (errorField !== false) {
        let errorInfo;
        if (errorField === "roll Number") {
          errorInfo = "Please enter valid University roll number";
        } else {
          errorInfo =
            "Your password must be 8-16 characters long, contain letters and numbers,and must not contain spaces,and emoji.";
        }

        const errorObject = {
          info: errorInfo,
        };

        setError(errorObject);
        setIsValidationError(true);
      } else {
        const personalFormData = {
          userName: userName,
          email: email,
          roll_number: roll_number,
          password: password,
        };
        setPersonalData(personalFormData);
      }
    } else {
      const errorObject = {
        info: "Password does not match",
      };
      setError(errorObject);
      setIsValidationError(true);
    }
  };

  return (
    <div className={styles.PersonalDetailsFormContainer}>
      {isValidationError ? (
        <ErrorPage
          opError={isValidationError}
          error={error}
          setError={setError}
        />
      ) : null}
      <form className={styles.PersonalDetailsForm}>
        <div className={styles.InputSection}>
          <div className={styles.InputDiv}>
            <span
              className={
                isNameActive || userName || userName.length
                  ? styles.SmallNamePlaceholder
                  : styles.NamePlaceHolder
              }
            >
              <p>Full Name</p>
            </span>
            <input
              type="text"
              name="userName"
              className={styles.NameInput}
              value={userName}
              placeholder={isNameActive ? "Enter your full name" : ""}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => setIsNameActive(true)}
              onBlur={() => setIsNameActive(false)}
              required
            />
          </div>
          <div className={styles.InputDiv}>
            <span
              className={
                isEmailActive || email || email.length
                  ? styles.SmallEmailPlaceholder
                  : styles.EmailPlaceHolder
              }
            >
              <p>Email</p>
            </span>
            <input
              type="email"
              name="email"
              value={email}
              placeholder={
                isEmailActive ? "Enter your email-id (email@example.com)" : ""
              }
              id="inputEmail4"
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => setIsEmailActive(true)}
              onBlur={() => setIsEmailActive(false)}
              required
            />
          </div>
          <div className={styles.InputDiv}>
            <span
              className={
                isRollActive || roll_number || roll_number.length
                  ? styles.SmallRollPlaceholder
                  : styles.RollPlaceHolder
              }
            >
              <p>University Roll Number</p>
            </span>
            <input
              type="text"
              name="roll_number"
              value={roll_number}
              placeholder={
                isRollActive ? "Enter your Unviersity Roll Number" : ""
              }
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => SetIsRollActive(true)}
              onBlur={() => SetIsRollActive(false)}
              required
            />
          </div>
          <div
            className={styles.InputDiv}
            title="Password should be 8-16 character long with atleast one Uppercase , one lowercase letter, one numeric digit and one special character"
          >
            <span
              className={
                isPwdActive || password || password.length
                  ? styles.SmallPasswordPlaceholder
                  : styles.PwdPlaceHolder
              }
            >
              <p>Password</p>
            </span>
            <input
              type={isHidden ? "password" : "text"}
              name="password"
              value={password}
              placeholder={isPwdActive ? "Enter your password" : ""}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => SetIsPwdActive(true)}
              onBlur={() => SetIsPwdActive(false)}
              required
            />
            {password.length ? (
              <img
                src={
                  isHidden
                    ? "assets/images/icons/LoginForm/eye.svg"
                    : "assets/images/icons/LoginForm/visibility_off_black_24dp.svg"
                }
                alt="show-password"
                className={styles.passwordVisibilityController}
                onClick={() => changePasswordView(isHidden, setIsHidden)}
              />
            ) : null}
          </div>
          <div className={styles.InputDiv}>
            <span
              className={
                isVerifyPwdActive || verificationPwd || verificationPwd.length
                  ? styles.SmallVerifyPasswordPlaceholder
                  : styles.VerifyPwdPlaceHolder
              }
            >
              <p>Verify Password</p>
            </span>
            <input
              type="password"
              name="verifyPassword"
              value={verificationPwd}
              placeholder={isVerifyPwdActive ? "Retype your password" : " "}
              onChange={(e) => _onChangeHandler(e)}
              onFocus={() => SetIsVerifyPwdActive(true)}
              onBlur={() => SetIsVerifyPwdActive(false)}
              required
            />
          </div>
        </div>
        <div className={styles.ContinueButtonSection}>
          <button
            className="btn btn-primary"
            disabled={
              userName.length &&
              email.length &&
              roll_number.length &&
              password.length &&
              error === null
                ? false
                : true
            }
            onClick={() => validationHandler()}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
