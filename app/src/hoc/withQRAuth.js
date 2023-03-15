import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import QRLoginPage from '../modules/Default/QRLoginPage';

const withQRAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const { setAuthToken, authToken } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
      if (!authToken) {
        if(storedToken && storedToken !== null){
          setAuthToken(storedToken);
        } 
      }
    }, [authToken, navigate]);

    return authToken ? <WrappedComponent {...props} /> : <QRLoginPage />;
  };

  return WithAuthWrapper;
};

export default withQRAuth;