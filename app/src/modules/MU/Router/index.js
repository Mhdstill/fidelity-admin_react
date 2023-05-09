import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AdminDefaultLayout from '../../../components/Layouts/AdminDefaultLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminProductListPage from '../../Default/AdminProductPages/AdminProductListPage';
import AdminProductNewPage from '../../Default/AdminProductPages/AdminProductNewPage';
import AdminProductEditPage from '../../Default/AdminProductPages/AdminProductEditPage';
import AdminCategoryListPage from '../../Default/AdminCategoryPages/AdminCategoryListPage';
import AdminCategoryNewPage from '../../Default/AdminCategoryPages/AdminCategoryNewPage';
import AdminCategoryEditPage from '../../Default/AdminCategoryPages/AdminCategoryEditPage';
import AdminHomePage from '../../Default/AdminHomePage';
import AdminSettingPage from '../../Default/AdminSettingPage';
import QRMenuPage from '../QRMenuPage';

const adminMenuItems = [
  {
    id: "item_1",
    itemName: "Produits",
    redirectPath: '/admin/products',
  },
  {
    id: "item_6",
    itemName: "Catégories",
    redirectPath: '/admin/categories',
  },
  {
    id: "item_5",
    itemName: "Configurations",
    redirectPath: '/admin/settings',
  },
];

const router = createBrowserRouter([
  {

    /**
     * ADMIN
     */
    element: <AdminDefaultLayout menuItems={adminMenuItems} />,
    children: [
      {
        path: '/admin',
        element: <AdminProductListPage />,
      },
      {
        path: '/admin/products',
        element: <AdminProductListPage />,
      },
      {
        path: '/admin/product/new',
        element: <AdminProductNewPage />,
      },
      {
        path: '/admin/product/:id',
        element: <AdminProductEditPage />,
      },
      {
        path: '/admin/categories',
        element: <AdminCategoryListPage />,
      },
      {
        path: '/admin/category/new',
        element: <AdminCategoryNewPage />,
      },
      {
        path: '/admin/category/:id',
        element: <AdminCategoryEditPage />,
      },
      {
        path: '/admin/settings/',
        element: <AdminSettingPage />,
      },
    ],
  },

  /**
   * QR App
   */
  {
    path: '/:operationToken/app',
    element: <QRMenuPage />
  },

]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
