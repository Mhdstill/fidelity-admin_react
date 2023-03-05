import logo from '../../../../logo.svg';
import '../../../../App.css';
import '../../../../Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AdminDefaultLayout from '../../../../components/Layouts/AdminDefaultLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../HomePage';
import ProductNewPage from '../ProductPages/ProductNewPage';
import ProductListPage from '../ProductPages/ProductListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminDefaultLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/test',
        element: <HomePage />,
      },
      {
        path: '/admin/products',
        element: <ProductListPage />,
      },
      {
        path: '/admin/product/new',
        element: <ProductNewPage />,
      },
    ],
  }
]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
