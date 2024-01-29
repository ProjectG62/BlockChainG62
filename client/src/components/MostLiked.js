import React, { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react"; 
import "./MostLiked.css"

const MostLiked = () => {
  const { contract } = useContract("0xECc91bBec0c259ed3F4B6F84914274a363da7ffe");
  const { data, isLoading } = useContractRead(contract, "getAllProperties");
  const [topProperties, setTopProperties] = useState([]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    let properties = data.map((property) => ({
      id: parseInt(property[0]._hex, 16),
      likeCount: parseInt(property.likeCount._hex, 16),
      details: property,
    }));

    properties.sort((a, b) => b.likeCount - a.likeCount);

    // Take the top 4 properties
    properties = properties.slice(0, 4);

    setTopProperties(properties);
  }, [data, isLoading]);

  return (
    <div className="most-liked">
        <h1 >Most Liked Properties</h1>
      <div className="properties-container">
        {topProperties.map((property) => (
          <div key={property.id} className="property-item property-card">
            <img src={property.details.images[0]} alt={property.details.propertyTitle} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.details.propertyTitle}</div>
              <div className="price">
                {Number((property.details.price * 10 ** -18).toFixed(2))} MATIC
              </div>
              <div className="address">
                {property.details.propertyAddress}, {property.details.city},{" "}
                {property.details.country}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostLiked;
