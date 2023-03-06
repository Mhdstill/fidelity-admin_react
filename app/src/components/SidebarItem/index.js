import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function SidebarItem(props) {
    
  const navigate = useNavigate();
  const { id, redirectPath, faIcon, itemName, subItems = [], isActive = false } = props;
  const [subItemVisible, setSubItemVisible] = useState(false);

  function handleMouseOver() {
    setSubItemVisible(true);
  }

  function handleMouseLeave() {
    setSubItemVisible(false);
  }

  const idMenuSubItem = `id_menu_under_${id}`;
  const styleMenuSubItem = {
    display: subItemVisible ? 'flex' : 'none'
  };

  return ( 
        <li className="sidebar-list-item sidebar-list-items" 
            key={id}
            onClick={redirectPath ? () => navigate(redirectPath) : () => {}}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
        >
            <div className={isActive ? 'sidebar-list-link sidebar-list-link-active' : 'sidebar-list-link'}>
                <FontAwesomeIcon icon={faIcon} />
                <span className="sidebar-list-link-text">{itemName}</span>
            </div>
           {subItems.length !== 0 ? 
           ( 
            <ul id={idMenuSubItem} style={styleMenuSubItem} className="sidebar-list-wrapper">
                {subItems.map((subItem) => (
                    <SidebarItem key={subItem.id} id={subItem.id} redirectPath={subItem.redirectPath} faIcon={subItem.faIcon} itemName={subItem.itemName} isActive={subItem.isActive} />
                ))}
            </ul>
            ) : (<></>)}
        </li>
  );
}

export default SidebarItem;