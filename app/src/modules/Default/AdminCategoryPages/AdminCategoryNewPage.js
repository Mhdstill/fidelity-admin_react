import React, { useState, useContext } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';

function AdminCategoryNewPage() {
    const { operationToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const formID = "new_category";
    const titleForm = "Création d'une catégorie de produit";
    const fields = [
        {
            id: formID + "_1",
            label: 'Nom',
            input:
                <Form.Control
                    type="text"
                    placeholder="Entrez le nom de la catégorie"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={(event) => setName(event.target.value.trim())}
                />
        }
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const productData = {
                name,
                operation: `/api/operations/${operationToken}`
            };
            const response = await callAPI('/api/categories', 'POST', productData);
            if (response) {
                navigate("/admin/categories")
                showNotification("La catégorie de produit a été créé avec succès.")
            }
        } catch (error) {
            showNotification("Une erreur a eu lieu, veuillez réessayer ultérieurement", "danger")
        }
    }

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminCategoryNewPage;