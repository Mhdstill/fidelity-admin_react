import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Searchbar(props) {
  const { handleSearch, placeholder = '' } = props;

  return (
    <div className="searchbar search-files">
      <input type="text" placeholder={placeholder} onChange={handleSearch} />
      <FontAwesomeIcon
        icon={faSearch}
        style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />
    </div>
  );
}

export default Searchbar;