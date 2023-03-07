import logo from './logo.svg';
import './App.css';
import './Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OPFDRouter from './modules/OPFD/Router';
import MFDRouter from './modules/MFD/Router';
import DefaultRouter from './modules/Default/Router';
import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { module } = useContext(AuthContext);

  switch (module) {
    case "OPFD":
      return <OPFDRouter />;
    case "MFD": 
      return <MFDRouter />;
    default: 
      return <DefaultRouter />;
  }

}

export default App;
