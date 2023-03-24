import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ButtonDropdown(props) {

    const { buttonLabel, redirectTo = '', buttonItems = [] } = props;
    const navigate = useNavigate();

    return (
        <div className="dropdown">
            <button
                style={{ fontSize: '1.6rem' }}
                type="button"
                onClick={redirectTo ? () => navigate(redirectTo) : ('')}
                className="btn btn-primary btn-lg bg-bd-main bg-bd-main-hover main-shadow"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {buttonLabel ? (<>{buttonLabel}</>) : (<FontAwesomeIcon icon={faPlus} />)}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {buttonItems.map((item) => (
                    <li key={item.label}>
                        <div className="dropdown-item d-flex align-items-center justify-content-between">
                            onClick={item.handleClick}
                            {item.faIcon ? (<FontAwesomeIcon icon={item.faIcon} />) : (<></>)}
                            {item.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ButtonDropdown;