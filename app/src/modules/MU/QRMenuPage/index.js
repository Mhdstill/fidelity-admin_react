import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRHeader from '../../../components/QRHeader';
import { callAPI } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../../../components/Pagination';
import QRMenuItem from '../QRMenuItem';
import SlideTabs from '../../../components/SlideTabs';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QRMenuPage() {

    const navigate = useNavigate();
    const { operationToken } = useParams();
 
    return (
        <>
            <div className='container'>
                <h1 className='text-center home-title'>
                    Vous êtes
                </h1>

                <div className='restaurant-pres mb-3'>
                    <img className='restaurant-img' src="/restaurant.jpeg" />
                    <p className='restaurant-title'>Pizza Feu de bois</p>
                    <p className='restaurant-subtitle'>91 Rue du Madrillet 7517</p>
                    <p className='restaurant-subtitle'>09 52 94 06 71</p>
                </div>

                <p className='restaurant-closed mb-3'>Restaurant ouvert jusqu’à 22h</p>



                <div onClick={() => navigate(`/${operationToken}/catalog`)} style={{cursor: "pointer"}} >
                    <p className='restaurant-access'>Consultez <br /> Nos Plats</p>
                    <div className='restaurant-access-i'>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                </div>


            </div>
            <div className='home-footer'>
                <div className='bg-footer'> blablabla </div>
                <div className='serveur-footer'> &nbsp; </div>
            </div>
        </>
    );
}

export default QRMenuPage;