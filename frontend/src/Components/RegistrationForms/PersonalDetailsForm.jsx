import React, { useState } from "react";
import { formValidationHandler, changePasswordView } from "../../helperMethods";

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
  const [password, setPassword] = useState("");
  const [roll_number, setRollNumber] = useState("");
  const [isRollActive, SetIsRollActive] = useState(false);
  const [isPwdActive, SetIsPwdActive] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

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
      default:
        const roll = value.trimLeft();
        roll.length ? setRollNumber(roll) : setRollNumber("");
        break;
    }
  };

  const validationHandler = () => {
    let errorField = formValidationHandler({ roll_number, password });

    if (errorField !== false) {
      let errorInfo;
      if (errorField === "roll number") {
        errorInfo = "Please enter valid University roll number";
      } else {
        errorInfo =
          "Your password must be 8-16 characters long, contain letters and numbers,and must not contain spaces,and emoji.";
      }

      const errorObject = {
        info: errorInfo,
      };

      setError(errorObject);
    } else {
      const personalFormData = {
        userName: userName,
        email: email,
        roll_number: roll_number,
        password: password,
      };
      setPersonalData(personalFormData);
    }
  };

  //style objects
  const labelStyle = {
    fontSize: "2rem",
  };

  const labelWithInfoStyle = {
    fontSize: "1rem",
  };

  const showPassword = {
    position: "absolute",
    top: "70%",
    left: "90%",
    cursor: "pointer",
  };

  const hidePassword = {
    position: "absolute",
    top: "65%",
    left: "90%",
    cursor: "pointer",
  };

  const rollNumberInfo = (
    <small
      id="passwordHelpBlock"
      className="form-text text-muted"
      style={{ display: isRollActive ? "block" : "none" }}
    >
      Enter your university Roll number starting with 169
    </small>
  );

  const rollNumberPlaceholder =
    (!isRollActive && window.innerWidth > 620 && window.innerWidth < 770) ||
    window.innerWidth > 1250
      ? "Enter your university Roll number starting with 169"
      : "";

  const passwordInfo = (
    <small
      id="passwordHelpBlock"
      className="form-text text-muted"
      style={{ display: isPwdActive ? "block" : "none", marginTop: 0 }}
    >
      Your password must be 8-16 characters long, contain letters and numbers,
      and must not contain spaces,and emoji.
    </small>
  );

  const passwordPlaceholder =
    (!isPwdActive && window.innerWidth > 620 && window.innerWidth < 770) ||
    window.innerWidth > 1250
      ? "Your password must be 8-16 characters long,and must not contain spaces,and emoji."
      : "";

  const showHidePwd = password.length ? (
    <img
      src={
        isHidden
          ? "assets/images/icons/eye.png"
          : "assets/images/icons/closed-eye.png"
      }
      alt="show-password"
      style={isPwdActive ? showPassword : hidePassword}
      onClick={() => changePasswordView(isHidden, setIsHidden)}
    />
  ) : null;

  const pwdBorder =
    password.length > 8 && password.length < 16
      ? {
          borderTop: "2px solid blue",
          borderBottom: "2px solid blue",
        }
      : password.length === 0
      ? {
          borderTop: "2px solid #98ded9",
          borderBottom: "2px solid #98ded9",
        }
      : {
          borderTop: "2px solid red",
          borderBottom: "2px solid red",
        };
  //style object

  return (
    <div>
      <div
        style={{
          opacity:
            loading || isRegistrationSuccess || isRegistrationError ? 0.1 : 1,
        }}
      >
        <h3>Registration Page</h3>
        <form>
          <div className="form-row" style={{ width: "100%" }}>
            <div className="form-group col-md-6">
              <label htmlFor="userName" style={labelStyle}>
                Name
              </label>
              <input
                type="text"
                name="userName"
                value={userName}
                className="form-control"
                onChange={(e) => _onChangeHandler(e)}
                required
                autoFocus
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control"
                id="inputEmail4"
                onChange={(e) => _onChangeHandler(e)}
                required
              />
            </div>
          </div>
          <div className="form-row" style={{ width: "100%" }}>
            <div className="form-group col-md-6">
              <label
                htmlFor="inputRoll"
                style={isRollActive ? labelWithInfoStyle : labelStyle}
              >
                University Roll Number
              </label>
              {rollNumberInfo}
              <input
                type="text"
                className="form-control"
                name="roll_number"
                value={roll_number}
                onChange={(e) => _onChangeHandler(e)}
                onFocus={() => onActiveHandler(SetIsRollActive)}
                onBlur={() => SetIsRollActive(false)}
                placeholder={rollNumberPlaceholder}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label
                htmlFor="inputPassword4"
                style={isPwdActive ? labelWithInfoStyle : labelStyle}
              >
                Password
              </label>
              {showHidePwd}
              {passwordInfo}
              <input
                type={isHidden ? "password" : "text"}
                name="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                onChange={(e) => _onChangeHandler(e)}
                onFocus={() => onActiveHandler(SetIsPwdActive)}
                onBlur={() => SetIsPwdActive(false)}
                placeholder={passwordPlaceholder}
                style={pwdBorder}
                required
              />
            </div>
          </div>
        </form>
        <div>
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
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
