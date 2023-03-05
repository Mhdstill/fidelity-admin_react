import React from 'react';
import { Form } from 'react-bootstrap';

function FormPage(props) {
    const { titleForm, fieldsBySteps } = props;

    return (
        <div class="block w-100 mx-4">
            <div class="block-header">
                <h2> {titleForm} </h2>
            </div>
            <div class="block-body" id="traitement_section">
                {fieldsBySteps.map((fields) => (
                    <div class="list-bullet">
                        <h3><i class="fa fa-hammer"></i> {fields.stepTitle} </h3>
                        {fields.stepFields.map((field) => (
                            <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                              <Form.Label>{field.label}</Form.Label>
                              <Form.Control type="text" placeholder="Entrez votre nom" />
                            </Form.Group>
                          </Form>
                        ))}
                    </div>
                ))}
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary" onclick="valider_traitement('658')" data-dashlane-rid="34c2906e565a9874" data-dashlane-label="true" data-form-type="action">
                        <i class="fa fa-check me-1"></i> Valider
                    </button>
                </div>

            </div>
        </div>
    );
}

export default FormPage;
