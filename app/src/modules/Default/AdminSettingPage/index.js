import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { AuthContext } from '../../../contexts/AuthContext';
import { API_URL, callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import { useParams } from 'react-router-dom';
import InputFloat from '../../../components/InputFloat';
import InputURL from '../../../components/InputURL';
import InputColor from '../../../components/InputColor';
import InputFile from '../../../components/InputFile';
import { uploadFile } from '../../../utils/dataManager';

function AdminSettingPage(props) {
    const { id } = useParams();
    const { authToken, operationToken } = useContext(AuthContext);
    const [coefficient, setCoefficient] = useState(1);
    const [colorCode, setColorCode] = useState("#f1f1f1");
    const formID = "edit_operation";
    const [file, setFile] = useState(null);
    const [previewFilePath, setPreviewFilePath] = useState(null);
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, SetTiktok] = useState('');

    const titleForm = "Paramètres";
    const fields = [
        {
            id: formID + "_1",
            label: 'Coefficient (point/euro)',
            input:
                <InputFloat field={coefficient} setField={setCoefficient} placeholder={"Entrez votre coefficient (point/euro)"} />
        },
        {
            id: formID + "_6",
            label: 'Code Couleur',
            input: <InputColor setValue={setColorCode} value={colorCode} />
        },
        {
            id: formID + "_7",
            label: 'Logo',
            input: <InputFile onChange={setFile} defaultImage={previewFilePath} />
        },
        {
            id: formID + "_2",
            label: 'Twitter',
            input:
                <InputURL value={twitter} setValue={setTwitter} placeholder={"Entrez votre Twitter"} domain={"twitter.com"}  />
        },
        {
            id: formID + "_3",
            label: 'Instagram',
            input:
                <InputURL value={instagram} setValue={setInstagram} placeholder={"Entrez votre Instagram"} domain={"instagram.com"}  />
        },
        {
            id: formID + "_4",
            label: 'Facebook',
            input:
                <InputURL value={facebook} setValue={setFacebook} placeholder={"Entrez votre Facebook"} domain={"facebook.com"}  />
        },
        {
            id: formID + "_5",
            label: 'TikTok',
            input:
                <InputURL value={tiktok} setValue={SetTiktok} placeholder={"Entrez votre TikTok"} domain={"tiktok.com"}  />
        },
        
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const productData = {
                coefficient,
                colorCode,
                twitter,
                facebook,
                instagram,
                tiktok
            };

            if(file){
                const mediaObjectIRI = await uploadFile(file);
                productData["logo"] = mediaObjectIRI;
            }

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
                setColorCode(data.colorCode);
                setTwitter(data.twitter);
                setFacebook(data.facebook);
                setInstagram(data.instagram);
                SetTiktok(data.tiktok);
                console.log(data);
                if('logo' in data && data.logo){
                    setPreviewFilePath(`${API_URL}/assets/img/${data.logo.filePath}`);
                }
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