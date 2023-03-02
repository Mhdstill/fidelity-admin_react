import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

/**
 * 
 * ButtonItems : 
 * - redirectTo (facultatif)
 * - handleClick
 * - faIcon
 * - label
 * 
 */
function EllipsisDropdown(props) {

  const { buttonItems } = props;

  return ( 
    <div class="dropdown">
        <button 
            type="button" 
            class="btn btn-icon" 
            data-bs-toggle="dropdown" 
            aria-expanded="false" 
        >
            <FontAwesomeIcon icon={faEllipsisVertical}/>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
            {buttonItems.map((item) => (
            <li>
                <button onClick={item.handleClick} class="dropdown-item" type="button">
                    {item.faIcon ? (<FontAwesomeIcon icon={item.faIcon}  className="me-2" />) : (<></>)} 
                    {item.label}
                </button>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default EllipsisDropdown;