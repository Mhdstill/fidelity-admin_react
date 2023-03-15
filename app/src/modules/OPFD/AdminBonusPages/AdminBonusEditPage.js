import React, { useState, useContext, useEffect } from 'react';
import AdminFormPage from '../../Default/AdminFormPage';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { callAPI } from '../../../utils/api';
import showNotification from '../../../components/Notification';
import Select2 from '../../../components/Select2';
import '../OPFD.css';
import InputFloat from '../../../components/InputFloat';
import InputCKEditor from '../../../components/InputCKEditor';

function AdminBonusEditPage(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [percent, setPercent] = useState('');
    const [products, setProducts] = useState([]);
    const [selectProducts, setSelectedProducts] = useState([]);
    const { authToken, operationToken } = useContext(AuthContext);
    const { id } = useParams();


    const navigate = useNavigate();
    const formID = "edit_bonus";
    const titleForm = "Modification d'un bonus";
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
            input: <InputCKEditor value={description} setValue={setDescription} />
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
    ];

    useEffect(() => {
        async function fetchBonus() {
            try {
                const response = await callAPI(`/api/${operationToken}/bonuses/${id}`, 'GET')
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
                setAmount(data.amount);
                setPercent(data.percent);

                async function fetchProducts() {
                    try {
                        const response = await callAPI(`/api/${operationToken}/products/${id}`, 'GET')
                        const responseData = await response.json();
                        const productsData = responseData['hydra:member'];
                        const productsOptions = productsData.map((product) => ({
                            value: product.id,
                            label: product.name,
                            selected: (data.products) ? data.products.some((p) => p.id === product.id) : false,
                        }));
                        setProducts(productsOptions);
                        const selectedProductsOptions = productsOptions.filter((product) => product.selected);
                        setSelectedProducts(selectedProductsOptions);
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        }
        fetchBonus();
    }, [id, authToken]);

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
            const response = await callAPI(`/api/${operationToken}/bonuses/${id}`, 'PUT', productData);
            if (response) {
                navigate("/admin/bonus")
                showNotification("Le bonus a été modifié avec succès.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminFormPage titleForm={titleForm} fields={fields} handleSubmit={handleSubmit} />
    );
}

export default AdminBonusEditPage;