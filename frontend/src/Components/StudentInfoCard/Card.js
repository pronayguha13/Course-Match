import React from "react";
import styles from "./Card.module.css";

const Card = ({ name, roll_number }) => {
  return (
    <div className={styles.CardContainer}>
      <p>Name: {name}</p>
      <p>roll number: {roll_number}</p>
    </div>
  );
};

export default Card;
