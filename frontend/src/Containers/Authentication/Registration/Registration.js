import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./Registration.module.css";
import { DisplayContext } from "../../../Context/DisplayContext";
import PersonalDetailsForm from "../../../Components/RegistrationForms/PersonalDetailsForm";
import CourseDetailsForm from "../../../Components/RegistrationForms/CourseDetailsForm";
import Loading from "../../../Components/Layout/Loading";
import SuccessPage from "../../../Components/Layout/SuccessPage";
import ErrorPage from "../../../Components/Layout/ErrorPage";

let pause;

const Registration = () => {
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isRegistrationError, setIsRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personalData, setPersonalData] = useState({});

  const history = useHistory();

  const { themeSwitcher } = useContext(DisplayContext);

  useEffect(() => {
    themeSwitcher();
    if (isRegistrationSuccess) {
      pause = setTimeout(() => {
        setIsRegistrationSuccess(false);
        history.push("/sign_in");
      }, 2000);
    } else if (isRegistrationError) {
      pause = setTimeout(() => {
        setIsRegistrationError(false);
      }, 1000);
    }
    return () => {
      clearTimeout(pause);
    };
  }, [themeSwitcher, history, isRegistrationSuccess, isRegistrationError]);

  const onActiveHandler = (handlerMethod) => {
    if (
      window.innerWidth < 620 ||
      (window.innerWidth > 770 && window.innerWidth < 1250)
    ) {
      handlerMethod(true);
    }
  };

  const regStateHandler = (regStatus) => {
    if (regStatus) {
      setIsRegistrationSuccess(true);
    } else {
      setError({
        info: "User already exist....",
      });
      setIsRegistrationError(true);
    }
  };

  // const _onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const formData = {
  //     name: name,
  //     email: email,
  //     password: password,
  //     roll_number: roll_number,
  //   };
  //   let errorField = formValidationHandler(formData);
  //   if (errorField !== false) {
  //     setIsRegistrationError(true);
  //     let errorInfo;
  //     if (errorField === "roll number") {
  //       errorInfo = "Please enter valid University roll number";
  //     } else {
  //       errorInfo =
  //         "Your password must be 8-16 characters long, contain letters and numbers,and must not contain spaces,and emoji.";
  //     }
  //     const errorObject = {
  //       field: errorField,
  //       info: errorInfo,
  //     };
  //     setError(errorObject);
  //   } else {
  //     setLoading(false);
  //     RegistrationFormSubmitHandler(formData, regStateHandler, setLoading);
  //   }
  // };

  return (
    <div className={styles.Registration}>
      <Loading loading={loading} />
      <SuccessPage regSuccess={isRegistrationSuccess} />
      {error !== null ? (
        <ErrorPage opError={isRegistrationError} error={error} />
      ) : null}
      {Object.keys(personalData).length ? (
        <CourseDetailsForm />
      ) : (
        <PersonalDetailsForm
          error={error}
          onActiveHandler={onActiveHandler}
          loading={loading}
          isRegistrationSuccess={isRegistrationSuccess}
          isRegistrationError={isRegistrationError}
          setIsRegistrationError={setIsRegistrationError}
          setError={setError}
          setPersonalData={setPersonalData}
        />
      )}
      <p>
        {" "}
        If you have an account <Link to="/sign_in">Sign In</Link>
      </p>
    </div>
  );
};

export default Registration;
