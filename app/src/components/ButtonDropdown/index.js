import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ButtonDropdown(props) {

    const { buttonLabel, redirectTo = '', buttonItems = [], buttonIcon = '' } = props;
    const navigate = useNavigate();

    let label = null;
    if (buttonLabel && buttonIcon) {
        label = (<><FontAwesomeIcon icon={buttonIcon} className='me-2' />{buttonLabel}</>);
    } else if (buttonLabel) {
        label = (<>{buttonLabel}</>);
    } else if (buttonIcon) {
        label = (<FontAwesomeIcon icon={buttonIcon} />);
    } else {
        label = (<FontAwesomeIcon icon={faPlus} />);
    }

    return (
        <div className="dropdown">
            <button
                type="button"
                onClick={redirectTo ? () => navigate(redirectTo) : ('')}
                className="btn btn-primary btn-lg bg-bd-main bg-bd-main-hover main-shadow"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {label}
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