import React, { useState } from 'react';
import QRLoginPage from '../../Default/QRLoginPage';
import QRMenuPage from '../../Default/QRMenuPage';

function QRPage() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 ?
        <QRLoginPage setStep={setStep} />
        : step === 2 ?
          <QRMenuPage />
          : step === 3 ?
            <Component3 />
            : step === 4 ?
              <Component4 />
              : <Component5 />
      }
    </>
  );
}

export default QRPage;
