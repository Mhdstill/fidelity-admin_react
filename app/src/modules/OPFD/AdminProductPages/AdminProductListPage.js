import React, { useContext } from 'react';
import EllipsisDropdown from '../../../components/EllipsisDropdown';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import withAdminAuth from '../../../hoc/withAdminAuth';
import { AuthContext } from '../../../contexts/AuthContext';
import AdminListPage from '../../Default/AdminListPage';

function AdminProductListPage(props) {
  const { authToken } = useContext(AuthContext);

  const TableHeaderItems = [
    "Column 1",
    "Column 2",
    "Actions"
  ];

  const TableRowActions = 
  [
    {
      faIcon: faUser,
      label: "Test",
    },
    {
      faIcon: faUser,
      label: "Test 2",
    },
  ]

  const TableRowItems = [
    [
      "Value 1",
      authToken,
      <EllipsisDropdown buttonItems={TableRowActions} />
    ],
    [
      "Value 3",
      "Value 4",
      <EllipsisDropdown buttonItems={TableRowActions} />
    ],
  ];

  return ( 
    <AdminListPage 
        entityName="Produits" 
        buttonLabel="Nouveau" 
        buttonRedirectTo="/admin/product/new" 
        TableHeaderItems={TableHeaderItems}
        TableRowItems={TableRowItems}
    />
  );
  
}

export default withAdminAuth(AdminProductListPage);