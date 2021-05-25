import React, { useState } from "react";
import Footer from "../Footer/Footer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className={styles.Container}>
      <span className={styles.HomePageImageContainer}>
        <img
          src="/assets/images/icons/undraw_education_f8ru.svg"
          alt="landing page image"
          className={styles.HomePageImage}
        />
      </span>
      <div className={styles.TextBanner}>
        <span>
          Lay but don't fell back...
          <br />
          Get along with your peers😎
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
