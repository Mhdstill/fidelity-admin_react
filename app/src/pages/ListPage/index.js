import React from 'react';
import TableList from '../../components/TableList';
import ButtonDropdown from '../../components/ButtonDropdown';
import Searchbar from '../../components/Searchbar';
function ListPage(props) {

  const {TableHeaderItems = [], TableRowItems = [], entityName = '', buttonLabel = null, buttonItems = [], buttonRedirectTo = null} = props;

  return ( 
    <div class="w-100 px-4">
      <div class="title-header">
            <h1>{entityName}</h1>
            {buttonLabel ? <ButtonDropdown redirectTo={buttonRedirectTo} buttonLabel={buttonLabel} buttonItems={buttonItems} /> : (<></>)}
      </div>
      <div class="mb-3">
        <Searchbar placeholder="Rechercher un produit..." />
      </div>
      <TableList entityName={entityName} HeaderItems={TableHeaderItems} RowItems={TableRowItems} />
    </div>
  );
}

export default ListPage;