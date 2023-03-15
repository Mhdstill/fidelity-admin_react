import React, { createContext, useState } from "react";

export const OperationContext = createContext({
    logoPath: null,
    setLogoPath: () => {},
    colorCode: null,
    setColorCode: () => {}
});

const OperationContextProvider = ({ children }) => {
  const [logoPath, setLogoPath] = useState(null);
  const [colorCode, setColorCode] = useState(null);

  return (
    <OperationContext.Provider
      value={{
        logoPath,
        setLogoPath,
        colorCode,
        setColorCode
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

export default OperationContextProvider;
