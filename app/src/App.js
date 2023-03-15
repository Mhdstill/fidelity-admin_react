import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OPFDRouter from './modules/OPFD/Router';
import MFDRouter from './modules/MFD/Router';
import { AuthContext } from './contexts/AuthContext';
import AdminLoginPage from './modules/Default/AdminLoginPage';
import { API_URL } from './utils/api';
import QRApp from './QRApp';
import NotFoundPage from './modules/Default/NotFoundPage';
import { OperationContext } from './contexts/OperationContext';


function App() {
  const [module, setModule] = useState(null);
  const [operationToken, setOperationToken] = useState(null);
  const { module: userOnlineModule } = useContext(AuthContext);
  const { setLogoPath, setColorCode } = useContext(OperationContext);

  // Set module from operationToken in URL
  useEffect(() => {
    if (operationToken) {
      fetch(`${API_URL}/api/operations/${operationToken}`)
        .then(response => response.json())
        .then((data) => {
          setModule(data.module.code);
          setLogoPath(data.logo.filePath);
          setColorCode(data.colorCode);
        });
    }
  }, [operationToken]);

  // Set module from User Online Operation
  useEffect(() => {
    if (userOnlineModule) {
      setModule(userOnlineModule);
    }
  }, [userOnlineModule]);

  // Dynamic Router
  switch (module) 
  {
    case "OPFD":
      return <OPFDRouter />;
    case "MFD":
      return <MFDRouter />;
  }


  // Default Router
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: <AdminLoginPage />
    },
    {
      path: '/admin/*',
      element: <AdminLoginPage />
    },
    {
      path: '/:operationToken/app',
      element: <QRApp setter={setOperationToken} />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );

}
export default App;