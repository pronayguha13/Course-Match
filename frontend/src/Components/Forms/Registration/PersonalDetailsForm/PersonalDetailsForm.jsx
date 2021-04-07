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
  setError,
  formSwitchHandler,
  displayCount,
  personalData,
}) => {
  const [userName, setUserName] = useState(
    displayCount !== 0 ? personalData.userName : ""
  );
  const [email, setEmail] = useState(
    displayCount !== 0 ? personalData.email : ""
  );
  const [rollNumber, setRollNumber] = useState(
    displayCount !== 0 ? personalData.rollNumber : ""
  );
  const [password, setPassword] = useState(
    displayCount !== 0 ? personalData.password : ""
  );
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
      let errorField = formValidationHandler({ rollNumber, password });
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
          rollNumber: rollNumber,
          password: password,
        };
        formSwitchHandler(personalFormData);
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
                  ? styles.SmallPlaceholder
                  : styles.PlaceHolder
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
                  ? styles.SmallPlaceholder
                  : styles.PlaceHolder
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
                isRollActive || rollNumber || rollNumber.length
                  ? styles.SmallPlaceholder
                  : styles.PlaceHolder
              }
            >
              <p>University Roll Number</p>
            </span>
            <input
              type="text"
              name="rollNumber"
              value={rollNumber}
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
                  ? styles.SmallPlaceholder
                  : styles.PlaceHolder
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
              <span className={styles.passwordVisibilityController}>
                <img
                  src={
                    isHidden
                      ? "assets/images/icons/LoginForm/eye.svg"
                      : "assets/images/icons/LoginForm/visibility_off_black_24dp.svg"
                  }
                  alt="show-password"
                  onClick={() => changePasswordView(isHidden, setIsHidden)}
                />
              </span>
            ) : null}
          </div>
          <div className={styles.InputDiv}>
            <span
              className={
                isVerifyPwdActive || verificationPwd || verificationPwd.length
                  ? styles.SmallPlaceholder
                  : styles.PlaceHolder
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
              rollNumber.length &&
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
