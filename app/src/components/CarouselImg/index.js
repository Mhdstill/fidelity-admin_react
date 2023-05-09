import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import { API_URL } from '../../utils/api';

function SliderImg(props) {
  const { images = [], height = '300px', width = 'auto' } = props;
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    setSliderImages(images);
  }, [images]);

  return (
    <Carousel prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />} nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}>
      {sliderImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={`${API_URL}/assets/img/${image}`} alt={`Slide ${index}`} style={{ height, width }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default SliderImg;
