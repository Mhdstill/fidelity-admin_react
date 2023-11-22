import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRHeader from '../../../components/QRHeader';
import { callAPI } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../../../components/Pagination';
import QRMenuItem from '../QRMenuItem';
import SlideTabs from '../../../components/SlideTabs';
import { faEye, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RestaurantCard from '../../../components/RestaurantCard';

function QRProductPage() {

    return (
        <>
            <div className='container'>

                <div className='catalog-page mb-3'>
                    <RestaurantCard />
                </div>

                <img className="product-img mb-3" src="https://recipecontent.fooby.ch/14199_3-2_1920-1280.jpg" />


                <p className='product-title mb-0'>
                    Bolognaise
                    <span className="product-price">12,30€</span>
                </p>
                <p className='product-ingredients mb-3'>
                    Boeuf haché, sauce tomate, ail, oignons,
                    huile d’olive vierge extra, feuilles de basilic
                </p>

                <div className='product-btn'>
                    Retour
                </div>

            </div>

            <div className='home-footer'>
                <div className='bg-footer'> blablabla </div>
                <div className='serveur-footer'> &nbsp; </div>
            </div>
        </>
    );
}

export default QRProductPage;