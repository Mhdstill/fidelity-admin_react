import React from 'react';

function Searchbar(props) {
  const { handleSearch, placeholder = '' } = props;

  return (
    <div className="searchbar search-files">
      <div class="form-outline mb-4">
        <input type="search" class="form-control form-control-lg" id="datatable-search-input" placeholder={"Rechercher..."} onChange={handleSearch} />
      </div>
    </div>
  );
}

export default Searchbar;