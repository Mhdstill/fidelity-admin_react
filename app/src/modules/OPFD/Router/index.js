import logo from '../../../logo.svg';
import '../../../App.css';
import '../../../Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AdminDefaultLayout from '../../../components/Layouts/AdminDefaultLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductNewPage from '../AdminProductPages/AdminProductNewPage';
import ProductListPage from '../AdminProductPages/AdminProductListPage';
import AdminLoginPage from '../../Default/AdminLoginPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminDefaultLayout />,
    children: [
      { index: true, element: <ProductListPage /> },
      {
        path: '/admin/products',
        element: <ProductListPage />,
      },
      {
        path: '/admin/product/new',
        element: <ProductNewPage />,
      }
    ],
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
