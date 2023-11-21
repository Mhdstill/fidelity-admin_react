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
import AdminSettingPage from '../../Default/AdminSettingPage';
import AdminHomePage from '../AdminHomePage';
import QRMenuPage from '../QRMenuPage';
import QRCatalogPage from '../QRCatalogPage';
import UserHomePage from '../../Default/UserApp/UserHomePage';

const adminMenuItems = [
  {
    id: "item_1",
    itemName: "Accueil",
    redirectPath: '/admin',
  },
  {
    id: "item_2",
    itemName: "Produits",
    redirectPath: '/admin/products',
  },
  {
    id: "item_3",
    itemName: "Catégories",
    redirectPath: '/admin/categories',
  },
  {
    id: "item_4",
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
        element: <AdminHomePage />,
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
  {
    path: '/:operationToken/catalog',
    element: <QRCatalogPage />
  },

]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
