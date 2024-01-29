import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import "./Propertylist.css"

const ImageSlider = ({ selectedProperty }) => {
  const [current, setCurrent] = useState(0);
  const images = selectedProperty.imageArray || []; // Use selectedProperty.imageArray as the image source

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="slider">
      <SlArrowLeft className="left-arrow" onClick={prevSlide} />
      {/* <SlArrowRight className="right-arrow" onClick={nextSlide} /> */}
      {images.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <img
              src={slide}
              alt={`property image ${index + 1}`}
              className="image"
            />
          )}
        </div>
      ))}
      <SlArrowRight className="right-arrow" onClick={nextSlide} />
    </div>
  );
};

export default ImageSlider;