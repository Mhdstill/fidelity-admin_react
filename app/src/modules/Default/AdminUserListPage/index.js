import React, { useContext, useEffect, useState } from 'react';
import withAdminAuth from '../../../hoc/withAdminAuth';
import { AuthContext } from '../../../contexts/AuthContext';
import AdminListPage from '../../Default/AdminListPage';
import { formatDatetimeToFR } from '../../../utils/date';
import { callAPI } from '../../../utils/api';

function AdminUserListPage(props) {
  const { operationToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // nouvel état loading

  const perPage = 10;

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true); // définir l'état "loading" sur "true"
      const response = await callAPI(`/api/${operationToken}/users?page=${currentPage}`, 'GET');
      const data = await response.json();
      const users = data['hydra:member'];
      setUsers(users.filter(user => !user.roles.includes("ROLE_ADMIN_CLIENT") && !user.roles.includes("ROLE_ADMIN")));
      setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
      setLoading(false); // définir l'état "loading" sur "false"
    }

    fetchUsers();
  }, [currentPage, operationToken]);

  const TableHeaderItems = [
    "Email",
    "Points",
    "Newsletter",
    "RGPD",
    "Nombre de commandes",
    "Date de création"
  ];

  const TableRowItems = users.map(user => ([
    user.email,
    user.points,
    (user.hasNewsletter)? "OUI":"NON",
    (user.hasRGPD)? "OUI":"NON3",
    user.orders.length,
    formatDatetimeToFR(user.createdAt)
]));

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <AdminListPage
      entityName="Utilisateurs"
      TableHeaderItems={TableHeaderItems}
      TableRowItems={TableRowItems}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      loading={loading} // passer l'état "loading" au composant AdminListPage
    />
  );

}

export default withAdminAuth(AdminUserListPage);