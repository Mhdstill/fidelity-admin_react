import React from 'react';
import SidebarItem from '../SidebarItem';
import { useLocation } from 'react-router-dom';

function Sidebar(props) {

    const { menuItems } = props;
    const location = useLocation();

    return (
        <div className="sidebar" id="mainSidebar">
            <ul id="id_menu" className="sidebar-list-wrapper">
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
