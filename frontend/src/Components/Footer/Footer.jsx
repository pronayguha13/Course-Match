import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.companyInfo}>
        <p className={styles.CompanyName}>Course Match</p>
        <address>4(3/1/A) B.N. Sarani, Mathpara</address>
        <address>Barrackpore, 700122</address>
        <address>Kolkata, India</address>
      </div>
      <div className={styles.contactInfo}>
        <span>
          <a href="mailto:pronay.guha@aot.edu.in">
            <img
              src="/assets/images/icons/contactIcon/email_white_24dp.svg"
              alt="email"
            />
          </a>
        </span>
        <span>
          <a href="https://github.com/pronayguha13" target="blank">
            <img
              src="/assets/images/icons/contactIcon/linkedin.png"
              alt="GitHub"
            ></img>
          </a>
        </span>
        <span>
          <a href="https://medium.com/@pronay.guha" target="blank">
            <img
              src="/assets/images/icons/contactIcon/medium.png"
              alt="Medium"
              style={{ height: "38px", width: "38px" }}
            ></img>
          </a>
        </span>
      </div>
      <div className={styles.SocialMediaInfo}></div>
    </div>
  );
};

export default Footer;
