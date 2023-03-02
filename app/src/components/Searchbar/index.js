import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Searchbar(props) {

  const {handleKeyUp, placeholder = ''} = props;

  return ( 
    <div class="searchbar search-files">
        <input type="text" placeholder={placeholder} onkeyup={handleKeyUp} />
        <FontAwesomeIcon icon={faSearch} style={{position: 'absolute', 'top': '50%', right: '15px', transform: 'translateY(-50%)', pointerEvents: 'none'}}/>
    </div>
  );
}

export default Searchbar;
