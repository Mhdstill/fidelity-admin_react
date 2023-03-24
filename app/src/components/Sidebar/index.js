import React from 'react';
import SidebarItem from '../SidebarItem';
import { useLocation } from 'react-router-dom';

function Sidebar(props) {

    const { menuItems } = props;
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className='className="d-flex align-items-center justify-content-between px-4'>
                <img src="https://my.wastreet.app/public/assets/img/logos/logo-wastreet.svg" className='mb-4' alt="Logo de Wastreet" style={{ height: '80px', width: '100%', margin: 'auto', display: 'block' }} />
            </div>
            <ul className='sidebar-ul'>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        id={item.id}
                        redirectPath={item.redirectPath}
                        faIcon={item.faIcon}
                        itemName={item.itemName}
                        isActive={item.isActive}
                        subItems={
                            ('subItems' in item && item.subItems)
                                ?
                                item.subItems.map((subItem) => ({
                                    ...subItem,
                                    isActive: subItem.redirectPath === location.pathname
                                }))
                                :
                                []

                        } />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
