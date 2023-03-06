import React from 'react';
import TableList from '../../../components/TableList';
import ButtonDropdown from '../../../components/ButtonDropdown';
import Searchbar from '../../../components/Searchbar';

function AdminListPage(props) {

  const {TableHeaderItems = [], TableRowItems = [], entityName = '', buttonLabel = null, buttonItems = [], buttonRedirectTo = null} = props;

  return ( 
    <div className="w-100 px-4">
      <div className="title-header">
            <h1>{entityName}</h1>
            {buttonLabel ? <ButtonDropdown redirectTo={buttonRedirectTo} buttonLabel={buttonLabel} buttonItems={buttonItems} /> : (<></>)}
      </div>
      <div className="mb-3">
        <Searchbar placeholder="Rechercher un produit..." />
      </div>
      <TableList entityName={entityName} HeaderItems={TableHeaderItems} RowItems={TableRowItems} />
    </div>
  );
}

export default AdminListPage;