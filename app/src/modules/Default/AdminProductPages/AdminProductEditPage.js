import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL, callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import { useParams } from 'react-router-dom';
import Select2 from '../../../components/Select2';
import InputFloat from '../../../components/InputFloat';

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
                categories: selectedCategories.map((category) => `/api/${operationToken}/categories/${category.value}`)
            };
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
                      console.log(selectedCategories);
                      const response = await fetch(`${API_URL}/api/${operationToken}/categories`);
                      const responseData = await response.json();
                      const categoriesData = responseData['hydra:member'];
                      const categoriesOptions = categoriesData.map((category) => ({
                          selected:  data.categories.some((c) => c.id === category.id),
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