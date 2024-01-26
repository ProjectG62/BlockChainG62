import React, { useState, useEffect } from "react";
import "./WishList.css";

import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

import SoldArray from "./SoldArray";

const SoldProperty = () => {
  const x = useAddress();
  const { contract } = useContract(
    "0x93E8DD8a558ea662791751FAAE4354EDb5399A91"
  );

  // Fetch all properties from the contract
  const { data: allProperties, isLoading: isAllPropertiesLoading } =
    useContractRead(contract, "getAllProperties");

  // Fetch the list of sold properties
  const { soldList } = SoldArray();

  // State to store liked properties
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    // Update liked properties when likeList changes
    setSoldProperties(soldList);
  }, [soldList]);

  if (isAllPropertiesLoading) {
    return <div>Loading...</div>;
  }

  // // Check if there are no liked properties
  // if (likedProperties.length === 0) {
  //   return <div>No Properties in your Favourites!</div>;
  // }

  // Check if there are no liked properties or no intersection with allProperties
  if (
    soldProperties.length === 0 ||
    soldProperties.every(
      (propertyId) =>
        allProperties.findIndex(
          (prop) => parseInt(prop[0]._hex, 16) === propertyId
        ) === -1
    )
  ) {
    return <div>No Properties in are Sold!</div>;
  }

  return (
    <div className="properties-container">
      {allProperties.map((property) => {
        const propertyId = parseInt(property[0]._hex, 16); // Extract property ID from the nested structure
        const isPropertySold = soldProperties.includes(propertyId);

        if (isPropertySold) {
          return (
            <div key={propertyId} className="property-item property-card">
              <img
                src={property.images[0]}
                alt={property.propertyTitle}
                className="img"
              />
              <div className="attributes">
                <div className="propTitle">{property.propertyTitle}</div>
                <div className="price">{property.price * 10 ** -18} MATIC</div>
                <div className="address">
                  {property.propertyAddress}, {property.city},{" "}
                  {property.country}
                </div>
              </div>
            </div>
          );
        } else {
          // You can remove the else block since the message is displayed outside the mapping loop
          return null;
        }
      })}
    </div>
  );
};

export default SoldProperty;
