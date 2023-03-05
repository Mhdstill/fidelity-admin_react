import logo from './logo.svg';
import './App.css';
import './Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from './components/Header';
import AdminDefaultLayout from './components/Layouts/AdminDefaultLayout';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListPage from './pages/ProductPages/ProductListPage';
import ProductNewPage from './pages/ProductPages/ProductNewPage';

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


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
