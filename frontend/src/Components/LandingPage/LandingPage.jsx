import React, { useState } from "react";
import Footer from "../Footer/Footer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className={styles.Container}>
      <img
        src="/assets/images/index/Students.jpg"
        alt="landing page image"
        className={styles.HomePageImage}
      />
      <div className={styles.TextBanner}>
        <span>
          Lay but don't fell back...
          <br />
          Get along with your peers😎
        </span>
      </div>
      {/* <div className={styles.ContactSection}>
        {!isContactOpen ? (
          <div onClick={() => setIsContactOpen(true)}>
            <img
              src="/assets/images/icons/contacticon/reachUs.png"
              alt="contact-us"
            ></img>
            <span>Contact us</span>
          </div>
        ) : (
          <div className={styles.ContactIconContainer}>
            <div className={styles.CloseButton}>
              <img
                src="/assets/images/icons/contactIcon/highlight_off_black_24dp.svg"
                alt="close"
                onClick={() => setIsContactOpen(false)}
              />
            </div>
            <div className={styles.ContactIcons}>
              <span>
                <a href="mailto:pronay.guha@aot.edu.in">
                  <img
                    src="/assets/images/icons/contactIcon/email_black_24dp.svg"
                    alt="Mail"
                  ></img>
                </a>
              </span>
              <span>
                <a href="https://github.com/pronayguha13" target="blank">
                  <img
                    src="/assets/images/icons/contactIcon/github.svg"
                    alt="GitHub"
                  ></img>
                </a>
              </span>
              <span>
                <a href="https://medium.com/@pronay.guha" target="blank">
                  <img
                    src="/assets/images/icons/contactIcon/medium.svg"
                    alt="Medium"
                  ></img>
                </a>
              </span>
            </div>
          </div>
        )} */}
      <Footer />
    </div>
  );
};

export default LandingPage;
