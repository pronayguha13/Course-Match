import React from "react";

const NotFoundCard = () => {
  return (
    <div>
      <img
        src="/assets/images/icons/warning-sign-yellow.png"
        alt="Warning-sign"
      />
      <p style={{ fontSize: 20, color: "red" }}>!No Friend Found! </p>
      {/* <p>!Check your Details!</p> */}
    </div>
  );
};

export default NotFoundCard;
