import React, { useState, useEffect } from "react";
import "./WishList.css";

import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

import BoughtArray from "./BoughtArray";

const BoughtProperty = () => {
  const x = useAddress();
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );

  // Fetch all properties from the contract
  const { data: allProperties, isLoading: isAllPropertiesLoading } =
    useContractRead(contract, "getEveryListedProperty");

  // Fetch the list of sold properties
  const { boughtList } = BoughtArray();

  // State to store liked properties
  const [boughtProperties, setboughtProperties] = useState([]);

  useEffect(() => {
    // Update liked properties when likeList changes
    setboughtProperties(boughtList);
  }, [boughtList]);

  if (isAllPropertiesLoading) {
    return <div>Loading...</div>;
  }

  // // Check if there are no liked properties
  // if (likedProperties.length === 0) {
  //   return <div>No Properties in your Favourites!</div>;
  // }

  // Check if there are no liked properties or no intersection with allProperties
  if (
    boughtProperties.length === 0 ||
    boughtProperties.every(
      (propertyId) =>
        allProperties.findIndex(
          (prop) => parseInt(prop[0]._hex, 16) === propertyId
        ) === -1
    )
  ) {
    return (
      <div
        style={{
          fontSize: "20px",
          textAlign: "center",
          padding: "3rem",
        }}
      >
        No Properties are Bought!
        <div>
          <img
            src="https://res.cloudinary.com/duwadnxwf/image/upload/v1706375714/empty-box_rw29yi.png"
            height={90}
            width={90}
          ></img>
        </div>
      </div>
    );
  }

  return (
    <div className="properties-container">
      {allProperties.map((property) => {
        const propertyId = parseInt(property[0]._hex, 16); // Extract property ID from the nested structure
        const isPropertybought = boughtProperties.includes(propertyId);

        if (isPropertybought) {
          return (
            <div key={propertyId} className="property-item property-card">
              <img
                src={property.images[0]}
                alt={property.propertyTitle}
                className="img"
              />
              <div className="attributes">
                <div className="propTitle">{property.propertyTitle}</div>
                <div className="price">
                  {Number((property.price * 10 ** -18).toFixed(2))} MATIC
                </div>
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

export default BoughtProperty;
