import React from 'react';
import { Form } from 'react-bootstrap';

const inputFloat = (props) => {
    const { field, setField, placeholder } = props;

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) { // autoriser les chiffres et '.' ou ','
            setField(value);
        }
    };

    const transformToFloat = (event) => {
        const value = event.target.value;
        if (isFloat(value)) {
            setField(parseFloat(value));
        } else {
            setField('');
        }
    };

    function isFloat(value) {
        return /^-?\d+(?:[.,]\d*?)?$/.test(value);
    }


    return (
        <>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={field}
                onChange={handleInputChange}
                onBlur={transformToFloat}
            />
        </>
    );
};

export default inputFloat;