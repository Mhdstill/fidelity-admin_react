import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Card({ children, title, icon }) {

    return (
        <div className="main-shadow main-radius bg-white w-100 p-4 mb-4">
            {title ? (
                <h5 className='text-center mb-4'>
                    <div className='home-icons'>
                        {icon ? (<FontAwesomeIcon icon={icon} />) : (<></>)}
                    </div>
                    {title}
                </h5>
            ) : (<></>)
            }
            {children}
        </div>
    );
};

export default Card;