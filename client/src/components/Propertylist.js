import React, { useState } from 'react';
import data from '../data.json';
import './Propertylist.css'; 
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
    <div className="properties-container">
      {data.map((property) => (
        <div key={property._id} className="property-item">
          <AiFillHeart
            size={24}
            color={likedProperties.includes(property._id) ? '#fa3e5f' : 'white'}
            onClick={() => handleLike(property._id)}
            className='like-container'
          />
          <img src={property.image} alt={property.name} className="img" />
          <p className="attributes">
            {property.title}
            <br />
            {property.price} MATIC
            <br />
            {property.address}, {property.city}, {property.country}
          </p>
          <button className="viewButton">View Property</button>
        </div>
      ))}
    </div>
  );
};

export default Propertylist;
