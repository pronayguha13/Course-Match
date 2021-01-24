import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../Context/LoginContext";
const Loading = () => {
  const { setLoading } = useContext(LoginContext);

  useEffect(() => {
    let wait = setTimeout(() => {
      console.log("inside setTimeOut");
    }, 2000);
    return () => {
      clearTimeout(wait);
    };
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
