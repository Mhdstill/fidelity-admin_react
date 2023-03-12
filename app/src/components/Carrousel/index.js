import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carrousel(props) {
    const {images} = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
      return (
        <Slider {...settings}>
         {images.length > 0 && images.map((image, index) => (
            <div>
                <img key={index} src={image} />
            </div>
         ))}
        </Slider>
      );
}

export default Carrousel;