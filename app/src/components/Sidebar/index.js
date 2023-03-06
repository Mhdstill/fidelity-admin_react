import React from 'react';
import SidebarItem from '../SidebarItem';
import { faIdCard, faRectangleList, faClipboardList, faGift, faShop, faBagShopping, faUsers, faSignOutAlt, faCartShopping, faGear } from '@fortawesome/free-solid-svg-icons';

function Sidebar(props) {

    /**
     * id: ID unique de chaque item
     * itemName: Nom à afficher sur l'item (obligatoire)
     * redirectPath: URL de redirection (facultatif)
     * faIcon: Icon de l'item (facultatif)
     * subItems: sous-menus des item ([] par défaut) => reprend tous les attributs de l'item (redirectPath, faIcon...)
     * isActive: item actif ou non (false par défaut)
     */
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
            redirectPath: '/admin/program/bonus',
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
