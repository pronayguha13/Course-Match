import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  formValidationHandler,
  RegistrationFormSubmitHandler,
  changePasswordView,
} from "../../../helperMethods";
import Loading from "../../Layout/Loading";

const Registration = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll_number, setRollNumber] = useState("");
  const [error, setError] = useState(null);
  const [isRollActive, SetIsRollActive] = useState(false);
  const [isPwdActive, SetIsPwdActive] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value.trimLeft());
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

  const regStateHandler = (regStatus) => {
    console.log("regStateHandler -> registrationStatus", regStatus);
    regStatus ? history.push("/sign_in") : alert("Error");
  };

  const _onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
      roll_number: roll_number,
    };
    let errorField = formValidationHandler(formData, "Registration");
    setError(errorField);
    if (!error) {
      setLoading(false);
      RegistrationFormSubmitHandler(formData, regStateHandler, setLoading);
    }
  };

  const onActiveHandler = (inputField) => {
    if (
      window.innerWidth < 620 ||
      (window.innerWidth > 770 && window.innerWidth < 1250)
    ) {
      if (inputField === "rollNumber") {
        SetIsRollActive(true);
      } else {
        SetIsPwdActive(true);
      }
    } else {
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

  const rollNumberErrorInfo = (
    <small
      id="passwordHelpBlock"
      className="form-text text-muted"
      style={{ display: error === "roll Number" ? "block" : "none" }}
    >
      Please enter valid University roll number
    </small>
  );

  const rollNumberPlaceholder =
    (!isRollActive && window.innerWidth > 620 && window.innerWidth < 770) ||
    window.innerWidth > 1250
      ? "Enter your university Roll number starting with 169"
      : "";

  const passwordErrorInfo = (
    <small id="passwordHelpBlock" className="form-text text-muted">
      Your password must be 8-16 characters long, contain letters and numbers,
      and must not contain spaces,and emoji.
    </small>
  );

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
          borderTop: "2px solid #fff",
          borderBottom: "2px solid #fff",
        }
      : {
          borderTop: "2px solid red",
          borderBottom: "2px solid red",
        };
  //style object

  return (
    <div>
      <Loading loading={loading} />
      <div style={{ opacity: loading ? 0.2 : 1 }}>
        <h3>Registration Page</h3>
        <form onSubmit={(e) => _onSubmitHandler(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Name" style={labelStyle}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
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
          <div className="form-row">
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
                onFocus={() => onActiveHandler("rollNumber")}
                onBlur={() => SetIsRollActive(false)}
                placeholder={rollNumberPlaceholder}
                required
              />
              {rollNumberErrorInfo}
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
                onFocus={() => onActiveHandler("password")}
                onBlur={() => SetIsPwdActive(false)}
                placeholder={passwordPlaceholder}
                style={pwdBorder}
                required
              />
              {error === "password" ? passwordErrorInfo : null}
            </div>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <p>
              {" "}
              if you have an account <Link to="/sign_in">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
