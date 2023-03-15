import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './contexts/AuthContext';
import OperationContextProvider from './contexts/OperationContext';

const rootElement = document.getElementById('root');

// Wrap your app inside a call to createRoot
createRoot(rootElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <OperationContextProvider>
        <App />
      </OperationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
