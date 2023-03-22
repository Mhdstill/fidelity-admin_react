import React, { createContext, useState } from "react";

export const OperationContext = createContext({
    logoPath: null,
    setLogoPath: () => {},
    colorCode: null,
    setColorCode: () => {},
    colorCodeRGBA: null,
    setColorCodeRGBA: () => {},
});

const OperationContextProvider = ({ children }) => {
  const [logoPath, setLogoPath] = useState(null);
  const [colorCode, setColorCode] = useState(null);
  const [colorCodeRGBA, setColorCodeRGBA] = useState(null);

  return (
    <OperationContext.Provider
      value={{
        logoPath,
        setLogoPath,
        colorCode,
        setColorCode,
        colorCodeRGBA,
        setColorCodeRGBA
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

export default OperationContextProvider;
