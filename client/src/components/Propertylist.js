import React, { useState } from "react";
import data from "../data.json";
import "./Propertylist.css";
import SearchBar from "./SearchBar";
import { AiFillHeart } from "react-icons/ai";
import ImageSlider from './ImageSlider';

const Propertylist = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [likedProperties, setLikedProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(data);

  const openPopup = (property) => {
    setSelectedProperty(property);
  };

  const closePopup = () => {
    setSelectedProperty(null);
  };

  const handleLike = (propertyId) => {
    setLikedProperties((prevLikedProperties) => {
      if (prevLikedProperties.includes(propertyId)) {
        return prevLikedProperties.filter((id) => id !== propertyId);
      } else {
        return [...prevLikedProperties, propertyId];
      }
    });
  };

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.price.toString().includes(searchTerm) ||
      property.country.toString().includes(searchTerm) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="properties-container">
        {filteredProperties.map((property) => (
          <div key={property._id} className="property-item property-card" onClick={() => openPopup(property)}>
            <AiFillHeart
              size={24}
              color={
                likedProperties.includes(property._id) ? "red" : "white"
              }
              onClick={() => handleLike(property._id)}
              className="like-container"
            />
            <img src={property.image} alt={property.name} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">
                {property.address}, {property.city}, {property.country}
              </div>
            </div>

            <button className="viewButton" onClick={() => openPopup(property)}>
              View Property
            </button>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div className="popup-container">
          <div className="popup-body">
            <div className="popup-header">
              <div className="popup-content">
                <h2>{selectedProperty.title}</h2> <br />
                <p>{selectedProperty.description}</p> <br />
                <p>Price: {selectedProperty.price} MATIC</p> <br />
                <p>
                  Address: {selectedProperty.address}, {selectedProperty.city},{" "}
                  {selectedProperty.country}
                </p>{" "}
                <br />
                <p>
                  Facilities: Bathrooms: {selectedProperty.facilities.bathrooms},
                  Parking: {selectedProperty.facilities.parking}, Bedrooms:{" "}
                  {selectedProperty.facilities.bedrooms}
                </p>
              </div>

              <div>
              <ImageSlider slides={selectedProperty.sliderImages} />
              </div>

              <div className="popup-buttons">
                <button className="BuyPropBtn"> Buy Property</button>
                <button className="closeButton" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Propertylist;
