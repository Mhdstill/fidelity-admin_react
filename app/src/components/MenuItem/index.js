import React, { useContext } from 'react';
import { OperationContext } from '../../contexts/OperationContext';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function MenuItem() {

    const { logoPath, colorCode } = useContext(OperationContext)

    return (
        <div className="col-md-12 mb-2 c-menu-item">
            <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                    <div className="row g-0">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp" className="w-100" />
                                <a href="#!">
                                    <div className="hover-overlay">
                                        <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-12">
                            <h5 className='fs-5' style={{ fontWeight: 'bold' }}>Rucksack Backpack Jeans</h5>
                            <div className="d-flex flex-row">
                                <div className="text-warning mb-1 me-2">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <span className="ms-1" style={{ color: `${colorCode}` }}>
                                        4.5 <span style={{ color: `black` }}>
                                            / 5
                                        </span>
                                    </span>

                                </div>
                                <span className="text-muted fs-6">154 commandes</span>
                            </div>

                            <p className="text mb-3 fs-6">
                                Short description about the product goes here, for ex its features. Lorem ipsum dolor sit amet with hapti you enter into any new area of science, you almost lorem ipsum is great text
                                consectetur adipisicing
                            </p>
                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-row align-items-center mb-1 justify-content-center">
                                <h4 className="mb-1 me-1 fs-4" style={{ fontWeight: 'bold' }} >34,50€</h4>
                            </div>
                            <div className="mt-4 text-center">
                                <button className="btn btn-lg btn-primary shadow-0" type="button" style={{ backgroundColor: `${colorCode}`, border: `${colorCode}` }} >
                                    <FontAwesomeIcon icon={faPlus} className='me-2' />
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;