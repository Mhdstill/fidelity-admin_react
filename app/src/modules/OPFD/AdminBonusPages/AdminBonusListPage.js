import React, { useContext, useEffect, useState } from 'react';
import withAdminAuth from '../../../hoc/withAdminAuth';
import { AuthContext } from '../../../contexts/AuthContext';
import AdminListPage from '../../Default/AdminListPage';
import DefaultListActions from '../../../components/DefaultListActions';
import showNotification from '../../../components/Notification';
import { callAPI } from '../../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AdminBonusListPage() {
    const { operationToken } = useContext(AuthContext);
    const [bonuses, setBonuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // nouvel état loading

    const perPage = 10;

    useEffect(() => {
        async function fetchBonuses() {
            setLoading(true); // définir l'état "loading" sur "true"
            const response = await callAPI(`/api/${operationToken}/bonuses?page=${currentPage}`, 'GET')
            const data = await response.json();
            setBonuses(data['hydra:member']);
            setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
            setLoading(false); // définir l'état "loading" sur "false"
        }

        fetchBonuses();
    }, [currentPage, operationToken]);

    const TableHeaderItems = [
        "Nom",
        "Description",
        "Gain",
        "Cible",
        "Actions"
    ];

    const TableRowItems = bonuses.map(bonus => ([
        bonus.name,
        <div dangerouslySetInnerHTML={{ __html: bonus.description }}></div>,
        (bonus.amount && bonus.amount !== null && bonus.amount !== '' && bonus.amount !== 'undefined') ? bonus.amount + "€" : bonus.percent + "%",
        ('products' in bonus && bonus.products.length > 0) ?
            bonus.products.map((product) => (<div key={uuidv4()}>  {product.name}  <br /> </div>))
            :
            "Toute la commande",
        <DefaultListActions editRedirectPath={`/admin/bonus/${bonus.id}`} onDelete={() => handleDelete(bonus.id)} />
    ]));

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
    }

    async function handleDelete(id) {
        const response = await callAPI(`/api/${operationToken}/bonuses/${id}`, 'DELETE');
        if (response) {
            setBonuses(bonuses.filter(bonus => bonus.id !== id));
            showNotification("Le bonus a été supprimé avec succès.")
        }
    }

    return (
        <AdminListPage
            entityName="Bonus"
            buttonLabel={<FontAwesomeIcon icon={faPlus} />}
            buttonRedirectTo="/admin/bonus/new"
            TableHeaderItems={TableHeaderItems}
            TableRowItems={TableRowItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading} // passer l'état "loading" au composant AdminListPage
        />
    );

}

export default withAdminAuth(AdminBonusListPage);
