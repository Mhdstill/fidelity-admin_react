import '../../../App.css';
import '../../../Wast.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AdminDefaultLayout from '../../../components/Layouts/AdminDefaultLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { faRectangleList, faClipboardList, faGift, faShop, faBagShopping, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import AdminProductListPage from '../../Default/AdminProductPages/AdminProductListPage';
import AdminProductNewPage from '../../Default/AdminProductPages/AdminProductNewPage';
import AdminProductEditPage from '../../Default/AdminProductPages/AdminProductEditPage';
import AdminCategoryListPage from '../../Default/AdminCategoryPages/AdminCategoryListPage';
import AdminCategoryNewPage from '../../Default/AdminCategoryPages/AdminCategoryNewPage';
import AdminCategoryEditPage from '../../Default/AdminCategoryPages/AdminCategoryEditPage';
import AdminUserListPage from '../../Default/AdminUserListPage';
import AdminBonusListPage from '../AdminBonusPages/AdminBonusListPage';
import AdminBonusNewPage from '../AdminBonusPages/AdminBonusNewPage';
import AdminBonusEditPage from '../AdminBonusPages/AdminBonusEditPage';
import AdminOrderListPage from '../AdminOrderListPage';
import AdminSettingPage from '../../Default/AdminSettingPage';
import AdminHomePage from '../../Default/AdminHomePage';
import QRHomePage from '../QRHomePage';
import QRLoginPage from '../../Default/QRLoginPage';

const menuItems = [
  {
    id: "item_1",
    itemName: "Menus",
    faIcon: faShop,
    subItems: [
      {
        id: "item_1-subItem_1",
        itemName: "Produits",
        redirectPath: '/admin/products',
        faIcon: faBagShopping,
      },
      {
        id: "item_1-subItem_2",
        itemName: "Catégories",
        redirectPath: '/admin/categories',
        faIcon: faRectangleList,
      }
    ],
  },
  {
    id: "item_2",
    itemName: "Bonus",
    redirectPath: '/admin/bonus',
    faIcon: faGift,
  },
  {
    id: "item_3",
    itemName: "Commandes",
    redirectPath: '/admin/orders',
    faIcon: faClipboardList,
  },
  {
    id: "item_4",
    itemName: "Utilisateurs",
    redirectPath: '/admin/users',
    faIcon: faUsers,
  },
  {
    id: "item_5",
    itemName: "Configurations",
    redirectPath: '/admin/settings',
    faIcon: faGear,
  },

];

const router = createBrowserRouter([
  {

    /**
     * ADMIN
     */
    element: <AdminDefaultLayout menuItems={menuItems} />,
    children: [
      { index: true, element: <AdminProductNewPage /> },
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
        path: '/admin/users/',
        element: <AdminUserListPage />,
      },
      {
        path: '/admin/bonus',
        element: <AdminBonusListPage />,
      },
      {
        path: '/admin/bonus/new',
        element: <AdminBonusNewPage />,
      },
      {
        path: '/admin/bonus/:id',
        element: <AdminBonusEditPage />,
      },
      {
        path: '/admin/orders/',
        element: <AdminOrderListPage />,
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
    element: <QRLoginPage />
  },

]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
