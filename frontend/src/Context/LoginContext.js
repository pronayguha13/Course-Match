import React, { createContext, useState } from "react";
export const LoginContext = createContext();
export const Login = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
