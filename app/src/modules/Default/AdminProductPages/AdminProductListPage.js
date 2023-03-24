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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_URL } from '../../../utils/api';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function AdminProductListPage() {
  const { operationToken } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // nouvel état loading

  const perPage = 1;

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

  const customBeforeSection =
    <Carousel responsive={responsive}>
      {products.map((product) => (
        <>
          {'images' in product && product.images && product.images.length > 0 ?
            (
              <div className="card mb-4 main-radius" style={{width: '18rem'}}>
                <img className="d-block w-100 main-top-radius" src={`${API_URL}/assets/img/${product.images[0].filePath}`} style={{ height: '20rem', width: '100%' }} />
                <div className="card-body">
                  <h5 className="card-text text-center">{product.name}.</h5>
                </div>
              </div>
            ) :
            (<></>)
          }
        </>
      ))}
    </Carousel>

  const TableHeaderItems = [
    /* "Image", */
    "Nom",
    "Prix",
    "Description",
    "Catégories",
    "Actions"
  ];

  const TableRowItems = products.map(product => ([
    /* ('images' in product && product.images && product.images.length > 0)? <SliderImg images={product.images.map(obj => obj.filePath)}  /> : '', */
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
      customBeforeSection={customBeforeSection}
    />
  );

}

export default withAdminAuth(AdminProductListPage);
