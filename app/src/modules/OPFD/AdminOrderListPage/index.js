import React, { useContext, useEffect, useState } from 'react';
import withAdminAuth from '../../../hoc/withAdminAuth';
import { AuthContext } from '../../../contexts/AuthContext';
import AdminListPage from '../../Default/AdminListPage';
import { callAPI } from '../../../utils/api';

function AdminOrderListPage(props) {
  const { operationToken, authToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // nouvel état loading

  const perPage = 10;

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true); // définir l'état "loading" sur "true"
      const response = await callAPI(`/api/${operationToken}/orders?page=${currentPage}`, 'GET')
      const data = await response.json();
      setOrders(data['hydra:member']);
      setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
      setLoading(false); // définir l'état "loading" sur "false"
    }

    fetchOrders();
  }, [currentPage, operationToken]);

  const TableHeaderItems = [
    "Utilisateur",
    "Commande",
    "Points gagnés",
    "Points dépensés",
    "Date de création"
  ];

  const TableRowItems = orders.map(order => ([
    '',
    '',
  ]));

  return (
    <AdminListPage
      entityName="Commandes"
      TableHeaderItems={TableHeaderItems}
      TableRowItems={TableRowItems}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(newPage) => {setCurrentPage(newPage)}}
      loading={loading} // passer l'état "loading" au composant AdminListPage
    />
  );

}

export default withAdminAuth(AdminOrderListPage);
