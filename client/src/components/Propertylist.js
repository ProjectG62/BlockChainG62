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
        
          <p className="attributes">{property.title} <br></br>
           {property.price} MATIC <br></br>
          {property.address}, {property.city}, {property.country}</p>
          <button className="viewButton" >view property </button>
        </div>
      ))}
    </div>
  );
};

export default Propertylist;