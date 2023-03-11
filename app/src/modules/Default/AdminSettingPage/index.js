import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb';
import { AuthContext } from '../../../contexts/AuthContext';
import { API_URL, callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import { useParams } from 'react-router-dom';
import InputFloat from '../../../components/InputFloat';
import InputURL from '../../../components/InputURL';

function AdminSettingPage(props) {
    const { id } = useParams();
    const { authToken, operationToken } = useContext(AuthContext);
    const [coefficient, setCoefficient] = useState(1);
    const formID = "edit_operation";

    const titleForm = "Paramètres";
    const fields = [
        {
            id: formID + "_1",
            label: 'Coefficient (point/euro)',
            input:
                <InputFloat field={coefficient} setField={setCoefficient} placeholder={"Entrez votre coefficient (point/euro)"} />
        },
        {
            id: formID + "_2",
            label: 'Twitter',
            input:
                <InputURL placeholder={"Entrez votre Twitter"} domain={"twitter.com"}  />
        },
        {
            id: formID + "_3",
            label: 'Instagram',
            input:
                <InputURL placeholder={"Entrez votre Instagram"} domain={"instagram.com"}  />
        },
        {
            id: formID + "_4",
            label: 'Facebook',
            input:
                <InputURL placeholder={"Entrez votre Facebook"} domain={"facebook.com"}  />
        },
        {
            id: formID + "_5",
            label: 'TikTok',
            input:
                <InputURL placeholder={"Entrez votre TikTok"} domain={"tiktok.com"}  />
        },
        
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const productData = {
                coefficient
            };
            const response = await callAPI(`/api/operations/${operationToken}`, 'PUT', productData);
            if (response) {
                showNotification("Les paramètres ont été mis à jour avec succès.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchOperation() {
            try {
                const response = await callAPI(`/api/operations/${operationToken}`, 'GET');
                const data = await response.json();
                setCoefficient(data.coefficient);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOperation();
    }, [id, authToken]);

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminSettingPage;