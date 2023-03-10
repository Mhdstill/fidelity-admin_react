import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  authToken: null,
  setAuthToken: () => {},
  userData: null,
  setUserData: () => {},
  operationToken: null,
  setOperationToken: () => {},
  module: null,
  setModule: () => {},
  refreshToken: null, 
  setRefreshToken: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [refreshAuthToken, setRefreshAuthToken] = useState(null);
  const [operationToken, setOperationToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [module, setModule] = useState(null);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");
    const storedOperationToken = localStorage.getItem("operationToken");
    const storedUserData = localStorage.getItem("userData");
    const storedModule = localStorage.getItem("module");
    const storedRefreshAuthToken = localStorage.getItem("refreshAuthToken");

    if (storedAuthToken && authToken !== storedAuthToken) {
      setAuthToken(storedAuthToken);
    }

    if (storedOperationToken && operationToken !== storedOperationToken) {
      setOperationToken(storedOperationToken);
    }

    if (storedUserData && userData !== storedUserData) {
      setUserData(storedUserData);
    }

    if (storedModule && module !== storedModule) {
      setModule(storedModule);
    }

    if (storedRefreshAuthToken && refreshAuthToken !== storedRefreshAuthToken) {
      setRefreshAuthToken(storedRefreshAuthToken);
    }

    checkTokenValidity();
  }, [authToken, operationToken, userData, module]);

  const checkTokenValidity = async () => {
    if (authToken) {
      try {
        const response = await fetch("/api/token/check", {method: "GET"});
        if (!response.ok) {
          throw new Error("Token is expired or invalid");
        }
      } catch (error) {
        console.error("Token is expired or invalid");
        setOperationToken(null);
        setAuthToken(null);
        setUserData(null);
        setModule(null);
        setRefreshAuthToken(null);
        localStorage.setItem('authToken', null);
        localStorage.setItem('operationToken', null);
        localStorage.setItem('userData', null);
        localStorage.setItem('module', null);
        localStorage.setItem('refreshAuthToken', null);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        operationToken,
        setOperationToken,
        userData,
        setUserData,
        module,
        setModule,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
