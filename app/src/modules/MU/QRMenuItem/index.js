import React, { useContext } from 'react';
import { OperationContext } from '../../../contexts/OperationContext';

function QRMenuItem() {
    const { colorCode, colorCodeRGBA, logoPath } = useContext(OperationContext);

    return (
        <div className="col-md-12 mb-4">
            <div className="shop-card shadow-5 rounded-3">
                <div className="card-body">
                    <div className="row">
                        <div className='col-8'>
                            <p className="mb-2" style={{ fontWeight: 'bold', color: colorCode, fontSize: '17px' }}>Chicken Big Tasty</p>
                            <p className="mb-2" style={{ fontSize: '13px', opacity: 0.75  }}>
                                Pain spécial, spécialité panée au poulet, salade, oignon, emmental fondu, tomate, sauce.
                            </p>
                            <p style={{fontSize: '16px'}}>
                                8,50€
                            </p>
                        </div>
                        <div className='col-4'>
                            <img src="https://media.istockphoto.com/id/1206323282/fr/photo/hamburger-juteux-sur-le-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=O2XzCk5ET9Eq_yP9JpoVdCfPHqtHtqrXz6NQz4rZr7E=" style={{ maxHeight: '150px', maxWidth: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QRMenuItem;