import React from 'react';
import { Form } from 'react-bootstrap';
import ReturnButton from '../../../components/ReturnButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function AdminFormPage(props) {
    const { titleForm, fields, handleSubmit } = props;

    return (
        <div className="block w-100 h-100 p-4 bg-white main-shadow main-radius">
            <div className='w-100'>
                <div className="block-header">
                    <h2> {titleForm} </h2>
                </div>
                <div className="block-body" id="traitement_section">
                    <Form onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <Form.Group key={field.id} className="mb-4">
                                <Form.Label htmlFor={field.id}>{field.label}</Form.Label>
                                {field.input}
                            </Form.Group>
                        ))}

                        <div className="d-flex justify-content-end">
                            <div className="me-3">
                                <ReturnButton />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary">
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </div>
                    </Form>

                </div>
            </div>
        </div>
    );
}

export default AdminFormPage;
