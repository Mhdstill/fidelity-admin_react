import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Button(props) {

    const { buttonLabel, redirectTo = '', buttonItems = [], buttonIcon = '', onClickEvent = '' } = props;
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

    let onClk = null;
    if (redirectTo) {
        onClk = () => navigate(redirectTo);
    } else if (onClickEvent) {
        onClk = onClickEvent;
    }

    console.log(onClk);

    return (
        <button
            type="button"
            onClick={onClk}
            className="btn btn-primary btn-lg bg-bd-main bg-bd-main-hover main-shadow"
        >
            {label}
        </button>
    );
}

export default Button;