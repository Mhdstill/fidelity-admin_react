import React, { useContext, useEffect, useState } from 'react';
import withAdminAuth from '../../../hoc/withAdminAuth';
import { AuthContext } from '../../../contexts/AuthContext';
import AdminListPage from '../../Default/AdminListPage';
import DefaultListActions from '../../../components/DefaultListActions';
import showNotification from '../../../components/Notification';

function AdminCategoryListPage(props) {
  const { operationToken, authToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // nouvel état loading

  const perPage = 10;

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true); // définir l'état "loading" sur "true"
      const response = await fetch(`https://mhd-it.fr/api/${operationToken}/categories?page=${currentPage}`);
      const data = await response.json();
      setCategories(data['hydra:member']);
      setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
      setLoading(false); // définir l'état "loading" sur "false"
    }

    fetchCategories();
  }, [currentPage, operationToken]);

  const TableHeaderItems = [
    "ID",
    "Nom",
    "Actions"
  ];

  const TableRowItems = categories.map(category => ([
    category.id,
    category.name,
    <DefaultListActions editRedirectPath={`/admin/category/${category.id}`} onDelete={() => handleDelete(category.id)}  />
  ]));

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  async function handleDelete(id) {
    await fetch(`https://mhd-it.fr/api/${operationToken}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    setCategories(categories.filter(category => category.id !== id));
    showNotification("La catégorie a été supprimé avec succès.")
  }

  return (
    <AdminListPage
      entityName="Catégories"
      buttonLabel="Nouveau"
      buttonRedirectTo="/admin/category/new"
      TableHeaderItems={TableHeaderItems}
      TableRowItems={TableRowItems}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      loading={loading} // passer l'état "loading" au composant AdminListPage
    />
  );

}

export default withAdminAuth(AdminCategoryListPage);
