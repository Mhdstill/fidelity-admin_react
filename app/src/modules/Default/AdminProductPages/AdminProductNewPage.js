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
import { API_URL } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import Select2 from '../../../components/Select2';

function AdminProductNewPage(props) {
    const navigate = useNavigate();
    const { authToken, operationToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [categories, setCategories] = useState([]);
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
                <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Entrez votre prix de boutique"
                    value={price}
                    onChange={(event) => setPrice(parseFloat(event.target.value))}
                />
        },
        {
            id: formID + "_3",
            label: 'Description',
            input:
                <Form.Group controlId="description">
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Ecrivez votre texte ici</p>"
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
            const response = await fetch(API_URL + '/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    operation: `/api/operations/${operationToken}`
                })
            });

            const data = await response.json();
            navigate("/admin/products")
            showNotification("Le produit a été créé avec succès.")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminProductNewPage;