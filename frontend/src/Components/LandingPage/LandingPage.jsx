import React, { useState } from "react";

import RegistrationPage from "Containers/Authentication/Registration/RegistrationPage";
import LoginPage from "Containers/Authentication/Signin/LoginPage";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [showRegistrationForm, _showRegistrationForm] = useState(false);

  return (
    <div className={styles.Container}>
      {!showRegistrationForm ? (
        <LoginPage _showRegistrationForm={_showRegistrationForm} />
      ) : (
        <RegistrationPage _showRegistrationForm={_showRegistrationForm} />
      )}
    </div>
  );
};

export default LandingPage;
