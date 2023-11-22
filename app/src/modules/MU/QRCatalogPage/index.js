import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRHeader from '../../../components/QRHeader';
import { callAPI } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../../../components/Pagination';
import QRMenuItem from '../QRMenuItem';
import SlideTabs from '../../../components/SlideTabs';
import { faEye, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RestaurantCard from '../../../components/RestaurantCard';
import Catalog from '../../../components/Catalog';

function QRCatalogPage() {
    
    const navigate = useNavigate();
    const { operationToken } = useParams();

    return (
        <div className='container'>

            <div className='catalog-page mb-3'>
                <RestaurantCard />
            </div>

            <div className='row'>
                <div className='col-6'>
                    <Catalog title="Les Entrées" image="https://recipecontent.fooby.ch/14199_3-2_1920-1280.jpg" />
                    <Catalog title="Les Pizzas" image="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg" />
                    <Catalog isActive={true} title="Les Pâtes" image="https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg" />
                    <Catalog title="Les Desserts" image="https://www.flavoursholidays.co.uk/wp-content/uploads/2020/07/Tiramisu-930x620.jpg.webp" />
                </div>

                <div className='col-6'>
                    <div className='catalog-products'>
                        <p className='cp-title'> Les Pastas</p>


                        <div className='mb-3'>
                            <span className='cp-product-name'>Lasagnes à la crème</span> <br />
                            <span className='cp-product-ingredients'>Boeuf haché, sauce tomate, ail...</span> <br />
                            <div className='cp-product-btn' onClick={() => navigate(`/${operationToken}/product/1`)}>
                                <FontAwesomeIcon icon={faEye} className='me-1' />
                                Consulter
                            </div>
                        </div>


                        <div className='mb-3'>
                            <span className='cp-product-name'>Pâtes Farcies</span> <br />
                            <span className='cp-product-ingredients'>Boeuf haché, sauce tomate, ail...</span> <br />
                            <div className='cp-product-btn'>
                                <FontAwesomeIcon icon={faEye} className='me-1' />
                                Consulter
                            </div>
                        </div>

                        <div className='mb-3'>
                            <span className='cp-product-name'>Tagliatèles au saumon</span> <br />
                            <span className='cp-product-ingredients'>Boeuf haché, sauce tomate, ail...</span> <br />
                            <div className='cp-product-btn'>
                                <FontAwesomeIcon icon={faEye} className='me-1' />
                                Consulter
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='home-footer'>
                <div className='bg-footer'> blablabla </div>
                <div className='serveur-footer'> &nbsp; </div>
            </div>
        </div>
    );
}

export default QRCatalogPage;