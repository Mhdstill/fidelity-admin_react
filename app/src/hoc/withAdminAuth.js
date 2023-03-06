import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const withAdminAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const { setAuthToken, authToken } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
      if (!authToken) {
        if(storedToken && storedToken !== null){
          setAuthToken(storedToken);
        } else {
          navigate('/login');
        }
      }
    }, [authToken, navigate]);

    return authToken ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthWrapper;
};

export default withAdminAuth;
