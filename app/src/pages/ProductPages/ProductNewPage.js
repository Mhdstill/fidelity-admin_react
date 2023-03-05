import React from 'react';
import FormPage from '../FormPage';

function ProductNewPage(props) {

    const titleForm = "Création d'un produit";
    const fieldsBySteps = [
        {
            stepTitle: "Test",
            stepFields: [
                {
                    label: 'Label 1',
                    input: <input type="test" />
                },
                {
                    label: 'Label 2',
                    input: <input type="test" />
                }
            ]
        },
        {
            stepTitle: "Test Part2",
            stepFields: [
                {
                    label: 'Label 1',
                    input: <input type="test" />
                },
                {
                    label: 'Label 2',
                    input: <input type="test" />
                }
            ]
        },
    ];

    return (
        <FormPage titleForm={titleForm} fieldsBySteps={fieldsBySteps} />
    );
}

export default ProductNewPage;
