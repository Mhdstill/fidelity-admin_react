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
import "react-multi-carousel/lib/styles.css";
import CarouselMultiple from '../../../components/CarouselMultiple';

function AdminProductListPage() {
  const { operationToken } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // nouvel état loading
  const [carouselItems, setCarouselItems] = useState([]);

  const perPage = 1;
  const items = [];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true); // définir l'état "loading" sur "true"
      const response = await callAPI(`/api/${operationToken}/products?page=${currentPage}`, 'GET');
      const data = await response.json();
      setProducts(data['hydra:member']);
      setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
      setLoading(false); // définir l'état "loading" sur "false"
    }

    fetchProducts();
  }, [currentPage, operationToken]);

  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      items.push({
        id: i,
        name: products[i].name,
        image: products[i].images[0].filePath
      });
    }
    setCarouselItems(items);
  }, [products]);

  const TableHeaderItems = [
    /* "Image", */
    "Nom",
    "Prix",
    "Description",
    "Catégories",
    "Actions"
  ];

  const TableRowItems = products.map(product => ([
    product.name,
    product.price + "€",
    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>,
    product.categories.map((category) => (<div key={uuidv4()}>{category.name} <br /></div>)),
    <DefaultListActions editRedirectPath={`/admin/product/${product.id}`} onDelete={() => handleDelete(product.id)} />
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
      buttonLabel={<FontAwesomeIcon icon={faPlus} />}
      buttonRedirectTo="/admin/product/new"
      TableHeaderItems={TableHeaderItems}
      TableRowItems={TableRowItems}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      loading={loading}
      customBeforeSection={<CarouselMultiple items={carouselItems} />}
    />
  );

}

export default withAdminAuth(AdminProductListPage);
