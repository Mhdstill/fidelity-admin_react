import React from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Outlet } from 'react-router-dom';

function AdminDefaultLayout(props) {

  const {menuItems} = props;

  return (
    <div>
      <Header />
      <div
        className='content-wrapper'
        style={{ background: '#f6f6f6', height: 'auto', minHeight: 'auto' }}
      >
        <Sidebar menuItems={menuItems} />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDefaultLayout;
