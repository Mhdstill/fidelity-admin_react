import logo from '../../../logo.svg';
import '../../../App.css';
import '../../../Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLoginPage from '../../Default/AdminLoginPage';
import QRLoginPage from '../QRLoginPage';

const router = createBrowserRouter([
  {
    path: '/admin/*',
    element: <AdminLoginPage />
  },
  {
    path: '/*',
    element: <QRLoginPage />
  }
]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
