import React from 'react';
import { Form } from 'react-bootstrap';
import ReturnButton from '../../../components/ReturnButton';

function AdminFormPage(props) {
    const { titleForm, fields, handleSubmit } = props;

    return (
        <div className="block w-100 mx-4" style={{ height: '100%' }}>
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
                        <button type="submit" className="btn btn-primary">
                            <i className="fa fa-check me-1"></i> Valider
                        </button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default AdminFormPage;
