import React, { useState } from 'react';
import {SlArrowRight, SlArrowLeft } from "react-icons/sl";


const ImageSlider = ({ selectedProperty }) => {
  const [current, setCurrent] = useState(0);
  const length = selectedProperty.sliderImages.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(selectedProperty.sliderImages) || selectedProperty.sliderImages.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <SlArrowLeft className='left-arrow' onClick={prevSlide} />
      <SlArrowRight className='right-arrow' onClick={nextSlide} />
      {selectedProperty.sliderImages.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide} alt={`property image ${index + 1}`} className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
