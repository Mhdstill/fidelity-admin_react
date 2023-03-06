import logo from '../../../logo.svg';
import '../../../App.css';
import '../../../Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AdminDefaultLayout from '../../../components/Layouts/AdminDefaultLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLoginPage from '../../Default/AdminLoginPage';
import AdminOrderPages from '../AdminOrderPages';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminDefaultLayout />,
    children: [
      { index: true, element: <AdminOrderPages /> },
    ]
  },
  {
    path: '/login',
    element: <AdminLoginPage />
  }
]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;