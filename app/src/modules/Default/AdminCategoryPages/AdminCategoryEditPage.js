import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import showNotification from '../../../components/Notification';
import { useParams } from 'react-router-dom';
import { API_URL, callAPI } from '../../../utils/api';

function AdminCategoryEditPage(props) {
    const { id } = useParams();
    const { authToken, operationToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const formID = "edit_category";

    const titleForm = "Modification d'une catégorie de produit";
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
            const response = await callAPI(`/api/${operationToken}/categories/${id}`, 'PUT', {name});
            if (response) {
                navigate("/admin/categories")
                showNotification("La catégorie a été mise à jour avec succès.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fethCategory() {
            try {
                const response = await fetch(API_URL + `/api/${operationToken}/categories/` + id, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                const data = await response.json();
                setName(data.name);
            } catch (error) {
                console.error(error);
            }
        }

        fethCategory();
    }, [id, authToken]);

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminCategoryEditPage;