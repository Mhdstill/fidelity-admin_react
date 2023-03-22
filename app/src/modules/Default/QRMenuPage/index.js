import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuItem from '../../../components/MenuItem';
import QRHeader from '../../../components/QRHeader';
import { callAPI } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../../../components/Pagination';

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

    return (
        <>
            <QRHeader />
            <section className='py-2'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                                <strong className="d-block py-2 fs-5"> {products.length} {elementFindWording} </strong>
                                {categories.length > 0 ? (
                                    <div className="ms-auto">
                                        <select className="form-select form-select-lg d-inline-block w-auto border pt-1">
                                            <option value="all">Tous</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={index}> {category.name} </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (<></>)}
                            </header>

                            {loading ? (
                                <div className="d-flex justify-content-center my-3">
                                    <Spinner animation="border" />
                                </div>
                            ) : (

                                <div className="row justify-content-center mb-3">
                                    <div className='row'>
                                        {products.map((product) => (
                                            <div className='col-md-4'>
                                                <MenuItem name={product.name} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            )}

                

                            {products.length > perPage ? (
                                <>
                                    <hr />

                                    <div className="d-flex justify-content-center align-items-center my-3">
                                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                    </div>
                                </>
                            ) : (<></>)}

                            {/* 
                            <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav> */}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default QRMenuPage;