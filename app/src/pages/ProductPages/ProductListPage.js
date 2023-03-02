import React from 'react';
import ListPage from '../ListPage';
import EllipsisDropdown from '../../components/EllipsisDropdown';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ProductListPage(props) {

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
      "Value 2",
      <EllipsisDropdown buttonItems={TableRowActions} />
    ],
    [
      "Value 3",
      "Value 4",
      <EllipsisDropdown buttonItems={TableRowActions} />
    ],
  ];

  return ( 
    <ListPage 
        entityName="Produits" 
        buttonLabel="Nouveau" 
        buttonRedirectTo="/admin/product/new" 
        TableHeaderItems={TableHeaderItems}
        TableRowItems={TableRowItems}
    />
  );
  
}

export default ProductListPage;