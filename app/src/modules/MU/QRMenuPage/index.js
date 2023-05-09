import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRHeader from '../../../components/QRHeader';
import { callAPI } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../../../components/Pagination';
import QRMenuItem from '../QRMenuItem';
import SlideTabs from '../../../components/SlideTabs';

function QRMenuPage() {

    const { operationToken } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const perPage = 10;
    function handlePageChange(newPage) {
        setCurrentPage(newPage);
    }

    const elementFindWording = (products.length > 1) ? "éléments trouvés" : "élément trouvé";

    useEffect(() => {
        async function fetchCategories() {
            const response = await callAPI(`/api/${operationToken}/categories`, 'GET');
            const data = await response.json();
            setCategories(data['hydra:member'])
        }

        fetchCategories();
    }, [operationToken]);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const response = await callAPI(`/api/${operationToken}/products?page=${currentPage}`, 'GET');
            const data = await response.json();
            setProducts(data['hydra:member'])
            setTotalPages(Math.ceil(data['hydra:totalItems'] / perPage));
            setLoading(false);
        }

        fetchProducts();
    }, [currentPage, operationToken]);

    const tabs = [
        {
            id: 'burger', title: 'Hamburgers', content:
                <div className="row justify-content-center mb-3">
                    <div className='row'>
                        {products.map((product) => (
                            <div className='col-md-4'>
                                <QRMenuItem name={product.name} />
                            </div>
                        ))}
                    </div>
                </div>
        },
        { id: 'profile', title: 'Profile', content: <p>Contenu de l'onglet Profile</p> },
        { id: 'contact', title: 'Contact', content: <p>Contenu de l'onglet Contact</p> },
    ];


    return (
        <>
            <section className='py-2'>
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <SlideTabs tabs={tabs} defaultActiveKey={"burger"} />

                            {loading ? (
                                <div className="d-flex justify-content-center my-3">
                                    <Spinner animation="border" />
                                </div>
                            ) : (<></>)}


                            {products.length > perPage ? (
                                <>
                                    <hr />

                                    <div className="d-flex justify-content-center align-items-center my-3">
                                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                    </div>
                                </>
                            ) : (<></>)}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default QRMenuPage;