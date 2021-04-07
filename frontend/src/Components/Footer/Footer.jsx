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
      <div style={{ width: "100%" }}>
        <div className={styles.SocialMediaInfo}>
          <div>
            <p className={styles.ConnectHeading}>Connect With Me</p>
          </div>
          <div className={styles.SocialMediaConnect}>
            <div className={styles.MailLink} title="Let's talk over mail">
              <a href="mailto:pronay.guha@aot.edu.in">
                <img
                  src="/assets/images/icons/contactIcon/email_white_24dp.svg"
                  alt="email"
                />
              </a>
            </div>
            <div
              className={styles.LinkedinLink}
              title="Connect with me on Linkedin"
            >
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
            </div>
            <div className={styles.MediumLink} title="Read my Publications">
              <a href="https://medium.com/@pronay.guha" target="blank">
                <img
                  src="/assets/images/icons/contactIcon/medium.png"
                  alt="Medium"
                ></img>
              </a>
            </div>
            <div className={styles.GithubLink} title="Check out my other works">
              <a href="https://github.com/pronayguha13/" target="blank">
                <img
                  src="/assets/images/icons/contactIcon/github.svg"
                  alt="github"
                />
              </a>
            </div>
            <div
              className={styles.TwitterLink}
              title="Connect with me on Twitter"
            >
              <a href="https://twitter.com/PronayReact" target="blank">
                <img
                  src="/assets/images/icons/contactIcon/twitter.png"
                  alt="twitter"
                  style={{ width: "40px" }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.CreateMessage}>
          Created with ❤ By Pronay Guha
        </div>
      </div>
    </div>
  );
};

export default Footer;
