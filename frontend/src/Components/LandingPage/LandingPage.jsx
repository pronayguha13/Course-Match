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
      <div className={styles.bannerSection}>
        <div className={`${styles.TextBanner} ${styles.bannerOne}`}>
          <span>Lay but don't fall back...</span>
        </div>
        <div className={`${styles.TextBanner} ${styles.bannerTwo}`}>
          <span>Get along with your peers😎</span>
        </div>
        <div className={`${styles.TextBanner} ${styles.bannerThree}`}>
          <span>Check what course your friends are taking...</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
