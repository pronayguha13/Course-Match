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
      <div className={styles.SocialMediaInfo}>
        <p className={styles.ConnectHeading}>Connect With Me</p>
        <div className={styles.SocialMediaConnect}>
          <span className={styles.MailLink}>
            <a href="mailto:pronay.guha@aot.edu.in">
              <img
                src="/assets/images/icons/contactIcon/email_white_24dp.svg"
                alt="email"
              />
            </a>
            <span className={styles.MailToolTip}> Let's talk over mail</span>
          </span>
          <span className={styles.LinkedinLink}>
            <a
              href="https://www.linkedin.com/in/pronay-guha-730815193"
              target="blank"
            >
              <img
                src="/assets/images/icons/contactIcon/linkedin.svg"
                alt="GitHub"
                style={{ width: "25px", height: "25px" }}
              ></img>
            </a>
            <span className={styles.LinkedinTooltip}>
              Connect with me on Linkedin
            </span>
          </span>
          <span className={styles.MediumLink}>
            <a href="https://medium.com/@pronay.guha" target="blank">
              <img
                src="/assets/images/icons/contactIcon/medium.png"
                alt="Medium"
              ></img>
            </a>
            <span className={styles.MediumTooltip}>Read my Publications</span>
          </span>
          <span className={styles.GithubLink}>
            <a href="https://github.com/pronayguha13/" target="blank">
              <img
                src="/assets/images/icons/contactIcon/github.svg"
                alt="github"
              />
            </a>
            <span className={styles.GithubTooltip}>
              Check out my other works
            </span>
          </span>
          <span className={styles.TwitterLink}>
            <a href="https://twitter.com/PronayReact" target="blank">
              <img
                src="/assets/images/icons/contactIcon/twitter.png"
                alt="twitter"
                style={{ width: "40px" }}
              />
            </a>
            <span className={styles.TwitterTooltip}>
              Connect with me on Twitter
            </span>
          </span>
        </div>
        <div className={styles.Message}>
          <p className={styles.CreateMessage}>Created with ❤ By Pronay Guha</p>
          <p className={styles.LicenceMessage}>All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
