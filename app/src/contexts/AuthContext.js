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
  }, [authToken, operationToken, userData, module]);

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
