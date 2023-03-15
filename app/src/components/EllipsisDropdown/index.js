import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function EllipsisDropdown(props) {

    const { buttonItems } = props;

    return (
        <div className="dropdown">
            <button
                type="button"
                className="btn btn-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {buttonItems.map((item) => (
                    <li key={item.label}>
                        <button onClick={item.handleClick} className="dropdown-item" type="button">
                            {item.faIcon ? (<FontAwesomeIcon icon={item.faIcon} className="me-2" />) : (<></>)}
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EllipsisDropdown;