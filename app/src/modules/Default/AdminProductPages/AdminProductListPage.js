import React, { useContext, useEffect, useState } from 'react';
import withAdminAuth from '../../../hoc/withAdminAuth';
import { AuthContext } from '../../../contexts/AuthContext';
import AdminListPage from '../../Default/AdminListPage';
import DefaultListActions from '../../../components/DefaultListActions';
import showNotification from '../../../components/Notification';
import { API_URL, callAPI } from '../../../utils/api';

function AdminProductListPage(props) {
  const { operationToken, authToken } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // nouvel état loading

  const perPage = 10;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true); // définir l'état "loading" sur "true"
      const response = await fetch(`https://mhd-it.fr/api/${operationToken}/products?page=${currentPage}`);
      const data = await response.json();
      setProducts(data['hydra:member']);
      setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
      setLoading(false); // définir l'état "loading" sur "false"
    }

    fetchProducts();
  }, [currentPage, operationToken]);

  const TableHeaderItems = [
    "ID",
    "Image",
    "Nom",
    "Prix",
    "Description",
    "Catégories",
    "Actions"
  ];

  const TableRowItems = products.map(product => ([
    '',
    '',
    product.name,
    product.price,
    product.description,
    product.categories.map((category) => (<>{category.name} <br/></>)),
    <DefaultListActions editRedirectPath={`/admin/product/${product.id}`} onDelete={() => handleDelete(product.id)}  />
  ]));

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  async function handleDelete(id) {
    const response = await callAPI(`/api/${operationToken}/products/${id}`, 'DELETE');
    if (response) {
      setProducts(products.filter(product => product.id !== id));
      showNotification("Le produit a été supprimé avec succès.")
    }
  }

  return (
    <AdminListPage
      entityName="Produits"
      buttonLabel="Nouveau"
      buttonRedirectTo="/admin/product/new"
      TableHeaderItems={TableHeaderItems}
      TableRowItems={TableRowItems}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      loading={loading} // passer l'état "loading" au composant AdminListPage
    />
  );

}

export default withAdminAuth(AdminProductListPage);
