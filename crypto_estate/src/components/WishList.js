import React, { useState, useEffect } from "react";
import "./WishList.css";
import profileData from "../profile.json";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import LikedArray from "./LikedArray";

const WishList = () => {
  const x = useAddress();
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );

  // Fetch all properties from the contract
  const { data: allProperties, isLoading: isAllPropertiesLoading } =
    useContractRead(contract, "getAllProperties");

  // Fetch the list of liked properties
  const { likeList } = LikedArray();

  // State to store liked properties
  const [likedProperties, setLikedProperties] = useState([]);

  useEffect(() => {
    // Update liked properties when likeList changes
    setLikedProperties(likeList);
  }, [likeList]);

  if (isAllPropertiesLoading) {
    return <div>Loading...</div>;
  }

  // // Check if there are no liked properties
  // if (likedProperties.length === 0) {
  //   return <div>No Properties in your Favourites!</div>;
  // }

  // Check if there are no liked properties or no intersection with allProperties
  if (
    likedProperties.length === 0 ||
    likedProperties.every(
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
        No Properties in your Favourites!
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
        const isPropertyLiked = likedProperties.includes(propertyId);

        if (isPropertyLiked) {
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

export default WishList;
