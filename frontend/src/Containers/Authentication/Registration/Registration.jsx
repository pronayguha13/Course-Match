import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./Registration.module.css";
import { DisplayContext } from "../../../Context/DisplayContext";
import PersonalDetailsForm from "../../../Components/Forms/Registration/PersonalDetailsForm.jsx";
import CourseDetailsForm from "../../../Components/Forms/Registration/CourseDetailsForm.jsx";
import Loading from "../../../Components/Layout/Loading.jsx";
import SuccessPage from "../../../Components/Layout/SuccessPage";
import ErrorPage from "../../../Components/Layout/ErrorPage";
import { RegistrationFormSubmitHandler } from "../../../helperMethods";

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
        window.location.reload();
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

  const registrationHandler = (e, courseDetails) => {
    e.preventDefault();
    setLoading(false);
    const newUserData = {
      ...personalData,
      ...courseDetails,
    };
    RegistrationFormSubmitHandler(newUserData, regStateHandler, setLoading);
  };

  return (
    <div className={styles.Registration}>
      <h3>Registration Page</h3>
      <Loading loading={loading} />
      <SuccessPage regSuccess={isRegistrationSuccess} />
      {error !== null ? (
        <ErrorPage opError={isRegistrationError} error={error} />
      ) : null}
      {Object.keys(personalData).length ? (
        <CourseDetailsForm
          user={personalData.userName}
          registrationHandler={registrationHandler}
        />
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
