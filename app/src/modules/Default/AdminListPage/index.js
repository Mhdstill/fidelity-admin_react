import React, { useState } from 'react';
import TableList from '../../../components/TableList';
import ButtonDropdown from '../../../components/ButtonDropdown';
import Searchbar from '../../../components/Searchbar';
import Pagination from '../../../components/Pagination';
import { Spinner } from 'react-bootstrap';

function AdminListPage(props) {
  const [searchText, setSearchText] = useState('');

  const {
    TableHeaderItems = [],
    TableRowItems = [],
    entityName = '',
    buttonLabel = null,
    buttonItems = [],
    buttonRedirectTo = null,
    currentPage,
    totalPages,
    onPageChange,
    loading
  } = props;

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const filteredRowItems = TableRowItems.filter((RowItem) => {
    return RowItem.some((RowField) => {
      return String(RowField).toLowerCase().includes(searchText.toLowerCase());
    });
  });

  return (
    <div className="w-100 px-4">
      <div className="title-header">
        <h1>{entityName}</h1>
        {buttonLabel ? <ButtonDropdown redirectTo={buttonRedirectTo} buttonLabel={buttonLabel} buttonItems={buttonItems} /> : (<></>)}
      </div>
      <div className="mb-3">
        <Searchbar placeholder={`Rechercher un ${entityName.toLowerCase()}...`} handleSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <TableList entityName={entityName} HeaderItems={TableHeaderItems} RowItems={filteredRowItems} />
      )}
      <div className="d-flex justify-content-center my-3">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}

export default AdminListPage;
