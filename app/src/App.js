import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OPFDRouter from './modules/OPFD/Router';
import MURouter from './modules/MU/Router';
import MFDRouter from './modules/MFD/Router';
import { AuthContext } from './contexts/AuthContext';
import AdminLoginPage from './modules/Default/AdminLoginPage';
import { API_URL } from './utils/api';
import QRApp from './QRApp';
import NotFoundPage from './modules/Default/NotFoundPage';
import { OperationContext } from './contexts/OperationContext';
import RestaurantPage from './modules/Default/RestaurantPage';
import MenuPage from './modules/Default/MenuPage';
import MealPage from './modules/Default/MealPage';

function App() {
  const [module, setModule] = useState(null);
  const [operationToken, setOperationToken] = useState(null);
  const { module: userOnlineModule } = useContext(AuthContext);
  const { setLogoPath, setColorCode, setColorCodeRGBA } = useContext(OperationContext);

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Set module from operationToken in URL
  useEffect(() => {
    if (operationToken) {
      fetch(`${API_URL}/api/operations/${operationToken}`)
        .then(response => response.json())
        .then((data) => {
          setModule(data.module.code);
          setLogoPath(data.logo.filePath);
          setColorCode(data.colorCode);
          setColorCodeRGBA(hexToRgba(data.colorCode, 0.80));
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
    case "MU":
      return <MURouter />;
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
      path: '/:operationToken/*',
      element: <QRApp setter={setOperationToken} />
    },
    {
      path: '/restaurant',
      element: <RestaurantPage />
    },
    {
      path: '/menu',
      element: <MenuPage />
    },
    {
      path: '/menu/:meal',
      element: <MealPage />
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