import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_URL } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';

function CarouselMultiple(props) {
    const { items = [], imgHeight = '20rem', resp  = null} = props;
    const [elements, setElements] = useState(items);
    const [responsive, setResponsive] = useState({
        superLargeDesktop: {
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
    });

    useEffect(() => {
        setElements(items);
        if(resp){
            setResponsive(resp);
        }
    }, [items]);

    return (
        <>
            {elements.length > 0 ? (
                <Carousel responsive={responsive}>
                    {elements.map((element) => (
                        <>
                            <div key={uuidv4()} className="card main-shadow mb-4 main-radius" style={{ width: '18rem' }}>
                                {'image' in element ? (
                                    <img key={uuidv4()} className="d-block w-100 main-top-radius" src={`${API_URL}/assets/img/${element.image}`} style={{ height: imgHeight, width: '100%' }} />
                                ) : (<></>)}
                                {'name' in element ? (
                                    <div key={uuidv4()} className="card-body">
                                        <h5 key={uuidv4()} className="card-text text-center">{element.name}.</h5>
                                    </div>
                                ) : (<></>)}
                            </div>
                        </>
                    ))}
                </Carousel>
            ) : (<></>)
            }
        </>
    );
}

export default CarouselMultiple;
