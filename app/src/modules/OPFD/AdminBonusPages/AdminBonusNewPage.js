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
import '../OPFD.css';
import InputFloat from '../../../components/InputFloat';

function AdminBonusNewPage(props) {
    const { authToken, operationToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [percent, setPercent] = useState('');
    const [products, setProducts] = useState([]);
    const [selectProducts, setSelectedProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`${API_URL}/api/${operationToken}/products`);
                const responseData = await response.json();
                const productsData = responseData['hydra:member'];
                const productsOptions = productsData.map((product) => ({
                    value: product.id,
                    label: product.name,
                }));
                setProducts(productsOptions);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, [operationToken]);

    const navigate = useNavigate();
    const formID = "new_bonus";
    const titleForm = "Création d'un bonus";
    const fields = [
        {
            id: formID + "_1",
            label: 'Nom',
            input:
                <Form.Control
                    type="text"
                    placeholder="Entrez le nom du bonus"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={(event) => setName(event.target.value.trim())}
                />
        },
        {
            id: formID + "_2",
            label: 'Description',
            input:
                <Form.Group controlId="description">
                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={handleCKEditorChange}
                        value={description}
                        config={{
                            language: 'fr',
                            ckfinder: {
                                uploadUrl: 'https://example.com/uploads'
                            }
                        }}
                    />
                </Form.Group>
        },
        {
            id: formID + "_3",
            label: 'Montant (€)',
            input:
                <InputFloat field={amount} setField={setAmount} placeholder={"Entrez le montant en €"} />
        },
        {
            id: formID + "_4",
            label: 'Montant (%)',
            input:
                <InputFloat field={percent} setField={setPercent} placeholder={"Entrez le montant en %"} />
        },
        {
            id: formID + "_5",
            label: "Produits spécifiques",
            input:
                <Select2
                    onChange={(selected) => setSelectedProducts(selected)}
                    options={products}
                />
        },
        /*
        {
            id: formID + "_6",
            label: "Sur toute la commande",
            input:
                <Form.Switch
                style={{ marginLeft: '5px' }}
                    type="checkbox"
                    id="custom-switch"
                    className='admin-switch'
                    checked={isChecked}
                    onChange={(event) => setIsChecked(event.target.checked)}
                />
        } */
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
                winPoint: true,
                products: selectProducts.map((product) => `/api/${operationToken}/products/${product.value}`),
                operation: `/api/operations/${operationToken}`,
                onOrder: (selectProducts.length === 0)
            };
            if (percent) {
                productData["percent"] = percent;
            } else {
                productData["amount"] = amount;
            }
            const response = await callAPI('/api/bonuses', 'POST', productData);
            if (response) {
                navigate("/admin/bonus")
                showNotification("Le bonus a été créé avec succès.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminBonusNewPage;