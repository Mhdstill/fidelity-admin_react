import React from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

function AdminDefaultLayout(props) {

  const {menuItems} = props;
  const location = useLocation();

  return (
    <div>
      <Header />
      <div
        className='content-wrapper'
        style={{ background: '#f6f6f6', height: 'auto', minHeight: 'auto' }}
      >
        <Sidebar menuItems={menuItems.map((menuItem) => ({
          ...menuItem,
          isActive: menuItem.redirectPath === location.pathname,
        }))} />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDefaultLayout;