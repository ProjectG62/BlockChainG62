import React, { useEffect } from 'react';
import data from '../data.json';
import './Propertylist.css'; // Import your CSS file


const Propertylist = () => {
  return (
    <div className="properties-container">
      <head>Properties Page</head>
      {data.map((property) => (
        <div key={property.id} className="property-item">
          <img src={property.image} alt={property.name} className="img" />
        
          <p>{property.title}</p>
          <p>{property.price} MATIC</p>
          <p>{property.address}, {property.city}, {property.country}</p>
          <button >view property </button>
        </div>
      ))}
    </div>
  );
};

export default Propertylist;