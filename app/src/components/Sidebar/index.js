import React from 'react';
import SidebarItem from '../SidebarItem';

function Sidebar(props) {

    const {menuItems} = props;

    return (
        <div className="sidebar" id="mainSidebar">
            <ul id="id_menu" className="sidebar-list-wrapper">
                {menuItems.map((item) => (
                    <SidebarItem key={item.id} id={item.id} redirectPath={item.redirectPath} faIcon={item.faIcon} itemName={item.itemName} isActive={item.isActive} subItems={item.subItems} />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
