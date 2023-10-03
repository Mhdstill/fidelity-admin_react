import React from 'react';
import SidebarItem from '../SidebarItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { logout } from '../../utils/dataManager';

function Sidebar(props) {

    const { menuItems } = props;
    const location = useLocation();
	const { userData } = useContext(AuthContext)
	const user = JSON.parse(userData);
	const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className='className="d-flex align-items-center justify-content-between px-4'>
                <img src="https://dev4you.fr/wp-content/uploads/2023/08/Color-logo-no-background-1.svg" alt="Logo" style={{ height: '80px', width: '100%', margin: 'auto', display: 'block' }} />
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
            <div className='sidebar-footer'>
                <p>Connecté en tant que <u> {user.email} </u></p>
                <button className='btn btn-primary btn-lg' onClick={() => logout(navigate, "/admin")}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
