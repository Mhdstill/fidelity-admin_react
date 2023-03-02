import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TableList from '../../components/TableList';

/**
 * 
 * ButtonItems : 
 * - redirectTo (facultatif)
 * - handleClick
 * - faIcon
 * - label
 * 
 */
function ButtonDropdown(props) {

  const { buttonLabel, redirectTo = '', buttonItems = [] } = props;
  const navigate = useNavigate();

  return ( 
    <div class="dropdown">
        <button 
            type="button"
            onClick={redirectTo? () => navigate(redirectTo):('')} 
            class="btn btn-primary" 
            data-bs-toggle="dropdown" 
            aria-expanded="false" 
        >
            <i class="fa fa-plus me-1"></i> {buttonLabel}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
            {buttonItems.map((item) => (
                <li>
                    <div class="dropdown-item d-flex align-items-center justify-content-between">
						onClick={item.handleClick}
                        {item.faIcon ? (<FontAwesomeIcon icon={item.faIcon}/>) : (<></>)} 
                        {item.label}
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default ButtonDropdown;