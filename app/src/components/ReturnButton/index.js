import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReturnButton(props) {

    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-danger"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            Retour
        </button>
    );
}

export default ReturnButton;