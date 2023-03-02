import logo from './logo.svg';
import './App.css';
import './Wast.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from './components/Header';
import DefaultLayout from './components/Layouts/DefaultLayout/DefaultLayout';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListPage from './pages/ProductPages/ProductListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
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
    ],
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
