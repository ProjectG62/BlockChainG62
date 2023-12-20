import React, { useState } from 'react';
import data from '../data.json';
import './Propertylist.css'; 
import SearchBar from './SearchBar';
import { AiFillHeart } from 'react-icons/ai';

const Propertylist = () => {
  const [likedProperties, setLikedProperties] = useState([]);

  const handleLike = (propertyId) => {
    setLikedProperties((prevLikedProperties) => {
      if (prevLikedProperties.includes(propertyId)) {
        // If property is already liked, remove it from the liked properties
        return prevLikedProperties.filter((id) => id !== propertyId);
      } else {
        // If property is not liked, add it to the liked properties
        return [...prevLikedProperties, propertyId];
      }
    });
  };

  return (
    <div>
      <SearchBar></SearchBar>
      <div className="properties-container">
        {data.map((property) => (
          <div key={property._id} className="property-item property-card">
            <AiFillHeart
              size={24}
              color={likedProperties.includes(property._id) ? '#fa3e5f' : 'rgb(192,192,194)'}
              onClick={() => handleLike(property._id)}
              className='like-container'
            />
            <img src={property.image} alt={property.name} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">{property.address}, {property.city}, {property.country}</div>
            </div>
            <button className="viewButton">View Property</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Propertylist;
