import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL, callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import { useParams } from 'react-router-dom';
import Select2 from '../../../components/Select2';
import InputFloat from '../../../components/InputFloat';
import InputFileMultiple from '../../../components/InputFileMultiple';
import { uploadFile } from '../../../utils/dataManager';
import InputCKEditor from '../../../components/InputCKEditor';

function AdminProductEditPage(props) {
    const { id } = useParams();
    const { authToken, operationToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const formID = "new_product";
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState(null);

    const titleForm = "Modification du produit";
    const fields = [
        {
            id: formID + "_1",
            label: 'Nom',
            input:
                <Form.Control
                    type="text"
                    placeholder="Entrez votre nom"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
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
            input: <InputCKEditor value={description} setValue={setDescription} />
        }, {
            id: formID + "_4",
            label: "Catégories",
            input:
                <Select2
                    onChange={(selected) => setSelectedCategories(selected)}
                    options={categories}
                />
        },
        {
            id: formID + "_5",
            label: "Images",
            input:
                <InputFileMultiple onChange={setFiles} />
        }
    ];

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

            const response = await callAPI(`/api/${operationToken}/products/${id}`, 'PUT', productData);
            if (response) {
                navigate("/admin/products")
                showNotification("Le produit a été mis à jour avec succès.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(API_URL + `/api/${operationToken}/products/` + id);
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);

                async function fetchCategories() {
                    try {
                        const response = await fetch(`${API_URL}/api/${operationToken}/categories`);
                        const responseData = await response.json();
                        const categoriesData = responseData['hydra:member'];
                        const categoriesOptions = categoriesData.map((category) => ({
                            selected: data.categories.some((c) => c.id === category.id),
                            value: category.id,
                            label: category.name,
                        }));
                        setCategories(categoriesOptions);
                        const selectedCategoriesOptions = categoriesOptions.filter((category) => category.selected);
                        setSelectedCategories(selectedCategoriesOptions);
                    } catch (error) {
                        console.error(error);
                    }
                }
                fetchCategories();
            } catch (error) {
                console.error(error);
            }
        }
        fetchProduct();
    }, [id, authToken]);

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminProductEditPage;