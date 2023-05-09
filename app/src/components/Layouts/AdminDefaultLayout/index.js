import React, { useState } from 'react';
import Sidebar from '../../Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MobileDetect from 'mobile-detect';
import './index.css';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile() !== null;

function AdminDefaultLayout(props) {

  const [isOpen, setIsOpen] = useState(!isMobile);
  const { menuItems } = props;
  const location = useLocation();

  console.log(menuItems);

  return (
    <>
      <div className="wrapper">
        <div className='app-container'>
          <div className={isOpen ? 'app-sidebar app-sidebar-open' : 'app-sidebar app-sidebar-close'}>
            <Sidebar menuItems={menuItems.map((menuItem) => ({
              ...menuItem,
              isActive: menuItem.redirectPath === location.pathname,
            }))} />
          </div>

          <div className={isOpen ? 'app-main' : 'app-main app-main-close'}>
            <div className="p-2">
              <Outlet />
            </div>
          </div>

        </div>
      </div>

      {isOpen ?
        (
          <div className='open-menu-btn' onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )
        :
        (
          <div className='close-menu-btn' onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )
      }


    </>
  );
}

export default AdminDefaultLayout;