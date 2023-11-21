import React  from 'react';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RestaurantCard() {

    return (
        <>
            <div className='restaurant-card-icon'>
                <FontAwesomeIcon icon={faUtensils} />
            </div>

            <div className='restaurant-card mt-5'>
                <div className="restaurant-card-text">
                    <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}> Pizza Feu De Bois </span>
                    <br />
                    91 Rue du Madrillet 7517 <br />
                    09 52 94 06 71
                </div>
            </div>
        </>
    );
}

export default RestaurantCard;