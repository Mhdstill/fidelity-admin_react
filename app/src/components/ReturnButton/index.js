import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ReturnButton(props) {

    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-lg btn-secondary"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );
}

export default ReturnButton;