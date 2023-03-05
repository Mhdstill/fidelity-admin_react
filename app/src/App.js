import logo from './logo.svg';
import './App.css';
import './Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OPFDRouter from './modules/Admin/OPFD/Router';


function App() {
  var type = "OPFD";
  switch (type) {
    case "OPFD":
      return <OPFDRouter />;
  }
}

export default App;
