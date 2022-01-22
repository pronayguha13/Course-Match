import React from "react";
import styles from "./styles.module.css";

const LandingPage = () => {
  return (
    <div className={styles.Container}>
      <span className={styles.HomePageImageContainer}>
        <img
          src="/assets/images/icons/undraw_education_f8ru.svg"
          alt="landing page"
          className={styles.HomePageImage}
        />
      </span>
      <div className={styles.bannerSection}>
        <div className={`${styles.TextBanner} ${styles.bannerOne}`}>
          <span>Lay but don't fell back...</span>
        </div>
        <div className={`${styles.TextBanner} ${styles.bannerTwo}`}>
          <span>Check what course your friends are taking...</span>
        </div>
        <div className={`${styles.TextBanner} ${styles.bannerThree}`}>
          <span role="img" aria-label="Card">
            Get along with your peers😎
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
