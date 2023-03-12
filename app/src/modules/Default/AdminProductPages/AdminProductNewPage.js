import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import Select2 from '../../../components/Select2';
import InputFloat from '../../../components/InputFloat';
import { uploadFile } from '../../../utils/dataManager';
import InputFileMultiple from '../../../components/InputFileMultiple';

function AdminProductNewPage(props) {
    const navigate = useNavigate();
    const { authToken, operationToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(`${API_URL}/api/${operationToken}/categories`);
                const responseData = await response.json();
                const categoriesData = responseData['hydra:member'];
                const categoriesOptions = categoriesData.map((category) => ({
                    value: category.id,
                    label: category.name,
                }));
                setCategories(categoriesOptions);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategories();
    }, [operationToken]);


    const formID = "new_product";
    const titleForm = "Création d'un produit";
    const fields = [
        {
            id: formID + "_1",
            label: 'Nom',
            input:
                <Form.Control
                    type="text"
                    placeholder="Entrez votre nom"
                    onBlur={(event) => setName(event.target.value.trim())}
                />
        },
        {
            id: formID + "_2",
            label: 'Prix',
            input:
                <InputFloat field={price} setField={setPrice} placeholder={"Entrez votre prix de boutique"} />
        },
        {
            id: formID + "_3",
            label: 'Description',
            input:
                <Form.Group controlId="description">
                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={handleCKEditorChange}
                        value={description}
                        config={{
                            language: 'fr', // Specify the language of the editor
                            ckfinder: {
                                // Upload the images to the server using the CKFinder
                                uploadUrl: 'https://example.com/uploads'
                            }
                        }}
                    />
                </Form.Group>
        }, {
            id: formID + "_4",
            label: "Catégories",
            input:
                <Select2
                    onChange={(selected) => setSelectedCategories(selected)}
                    options={categories}
                />
        }, {
            id: formID + "_5",
            label: "Image",
            input:
                <InputFileMultiple onChange={setFiles} />
        }
    ];

    function handleCKEditorChange(event, editor) {
        const data = editor.getData();
        setDescription(data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const productData = {
                name,
                description,
                price,
                operation: `/api/operations/${operationToken}`,
                categories: selectedCategories.map((category) => `/api/${operationToken}/categories/${category.value}`),
            };

            let mediaObjects = [];
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const mediaObjectIRI = await uploadFile(file);
                    mediaObjects.push(mediaObjectIRI);
                }
                productData["images"] = mediaObjects;
            }

            const response = await callAPI('/api/products', 'POST', productData);
            if (response) {
                navigate("/admin/products")
                showNotification("Le produit a été créé avec succès.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminProductNewPage;