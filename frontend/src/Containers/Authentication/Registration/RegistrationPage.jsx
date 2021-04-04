import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import { DisplayContext } from "Context/DisplayContext";
import PersonalDetailsForm from "Components/Forms/Registration/PersonalDetailsForm/PersonalDetailsForm.jsx";
import CourseDetailsForm from "Components/Forms/Registration/CourseDetailsForm.jsx";
import Loading from "Components/Layout/Loading.jsx";
import SuccessPage from "Components/Layout/SuccessPage";
import ErrorPage from "Components/Layout/ErrorPage";
import { RegistrationFormSubmitHandler } from "helperMethods";

let pause;

const RegistrationPage = () => {
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isRegistrationError, setIsRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personalData, setPersonalData] = useState({ userName: "Pronay Guha" });
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const history = useHistory();

  const { themeSwitcher } = useContext(DisplayContext);
  const formSwitchHandler = (personalDetails) => {
    setPersonalData(personalDetails);
    setShowCourseForm(true);
  };
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
  const goBackButtonHandler = () => {
    let prevDisplayCount = displayCount;
    setDisplayCount(++prevDisplayCount);
    setShowCourseForm(false);
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
    <div className={styles.RegistrationPageContainer}>
      <Loading loading={loading} />
      <SuccessPage regSuccess={isRegistrationSuccess} />
      {isRegistrationError ? (
        <ErrorPage
          opError={isRegistrationError}
          error={error}
          setError={setIsRegistrationError}
        />
      ) : null}
      {!showCourseForm ? (
        <PersonalDetailsForm
          error={error}
          setError={setError}
          onActiveHandler={onActiveHandler}
          loading={loading}
          isRegistrationSuccess={isRegistrationSuccess}
          isRegistrationError={isRegistrationError}
          setIsRegistrationError={setIsRegistrationError}
          formSwitchHandler={formSwitchHandler}
          displayCount={displayCount}
          personalData={personalData}
        />
      ) : (
        <CourseDetailsForm
          user={personalData.userName}
          registrationHandler={registrationHandler}
          goBackButtonHandler={goBackButtonHandler}
        />
      )}
      <p>
        {" "}
        If you have an account <Link to="/sign_in">Sign In</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
