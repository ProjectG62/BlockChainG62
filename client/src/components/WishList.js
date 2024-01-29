import React, { useState, useEffect } from "react";
import {
  useContract,
  useContractRead,
  useAddress,
  useTransferNativeToken,
  Web3Button,
} from "@thirdweb-dev/react";
import LikedArray from "./LikedArray";
import { CONTRACT_ADDRESS } from "./pages/addresses";
import PopupMap from "./PopupMap";
import ImageSlider from "./ImageSlider";
import "./Propertylist.css";

const WishList = () => {
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );
  const [JsonData, setJsonData] = useState([]);
  const { data, isLoading } = useContractRead(contract, "getAllProperties");

  const buyer = useAddress();

  const { likeList } = LikedArray();
  const [likedProperties, setLikedProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showBuySuccessPopup, setShowBuySuccessPopup] = useState(false);

  useEffect(() => {
    setLikedProperties(likeList);
  }, [likeList]);

  const openPopup = (property) => {
    setSelectedProperty(property);
  };

  const closePopup = () => {
    setSelectedProperty(null);
  };

  useEffect(() => {
    const buySuccessTimeout = setTimeout(() => {
      setShowBuySuccessPopup(false);
    }, 5000);

    return () => clearTimeout(buySuccessTimeout);
  }, [showBuySuccessPopup]);

  useEffect(() => {
    // Check if data is still loading
    if (isLoading) {
      // Data is still loading, do nothing for now
      return;
    }

    // Data has been loaded, process and save
    const tempJsonData = data.map((propertyData) => ({
      owner: propertyData.owner,
      _id: parseInt(propertyData[0]._hex, 16),
      title: propertyData[5],
      description: propertyData.description,
      price: Number(
        (parseInt(propertyData[2]._hex, 16) * 10 ** -18).toFixed(2)
      ),
      address: propertyData.propertyAddress,
      city: propertyData.city,
      country: propertyData.country,
      image: propertyData.images[0],
      imageArray: propertyData.images,
      facilities: {
        bathrooms: parseInt(propertyData.nBathrooms._hex, 16),
        parking: parseInt(propertyData.nParking._hex, 16),
        bedrooms: parseInt(propertyData.nRooms._hex, 16),
      },
    }));

    setJsonData(tempJsonData);
  }, [data, isLoading]);

  const { mutate: transferNativeToken, error } = useTransferNativeToken();

  if (error) {
    console.error("failed to transfer tokens", error);
  }

  console.log(JsonData, "allProperties");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (likedProperties.length === 0 || JsonData.length === 0) {
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
            alt="Empty Box"
          />
        </div>
      </div>
    );
  }

  const likedPropertiesData = JsonData.filter((property) =>
    likedProperties.includes(parseInt(property._id))
  );
  console.log(likedPropertiesData, "likedPropData");
  console.log(likedProperties, "likedProps");

  if (likedPropertiesData.length === 0) {
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
            alt="Empty Box"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="properties-container">
        {likedPropertiesData.map((property) => (
          <div key={property._id._hex} className="property-item property-card">
            <img src={property.image} alt={property.title} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">
                {property.address}, {property.city}, {property.country}
              </div>
              <button
                className="viewButton"
                onClick={() => openPopup(property)}
              >
                View Property
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProperty && (
        <div className="popup-container">
          <div className="popup-body">
            <div className="popup-header">
              {/* Left Side */}

              <div className="popup-content">
                <div className="mainBox" style={{ fontSize: "17px" }}>
                  <div>
                    <h2 style={{ color: "rgb(102, 62, 2)" }}>
                      {selectedProperty.title}
                    </h2>
                    <p>{selectedProperty.description}</p>
                    <p>
                      <br></br>
                      <h5 style={{ color: "rgb(102, 62, 2)" }}>Address:</h5>
                      {selectedProperty.address}, {selectedProperty.city},{" "}
                      {selectedProperty.country}
                    </p>{" "}
                    <p>
                      <br></br>
                      <h5 style={{ color: "rgb(102, 62, 2)" }}>Facilities:</h5>
                      Bathrooms: {selectedProperty.facilities.bathrooms},
                      Parking: {selectedProperty.facilities.parking}, Bedrooms:{" "}
                      {selectedProperty.facilities.bedrooms}
                    </p>
                  </div>

                  {/* Right Side */}
                  <div className=" prices">
                    {selectedProperty.imageArray.length === 1 ? (
                      <img
                        src={selectedProperty.imageArray[0]}
                        alt={`property image ${selectedProperty._id}`}
                        className="single-image"
                        style={{ width: "90%", height: "50%", borderRadius: "1rem"}}
                      />
                    ) : (
                      <ImageSlider selectedProperty={selectedProperty} />
                    )}

                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "right",
                        fontSize: "30px",
                        paddingLeft: "4rem",
                      }}
                    >
                      Price: {selectedProperty.price} MATIC{" "}
                      <img
                        src="https://res.cloudinary.com/duwadnxwf/image/upload/v1704972760/icons8-polygon-64_kpqfrj.png"
                        width={30}
                        height={30}
                        alt="matic"
                      ></img>
                    </p>
                    {/* Map */}
                  </div>
                </div>
                <div className="popup-map">
                  <h5 style={{ paddingTop: "2rem", color: "rgb(102, 62, 2)" }}>
                    {" "}
                    Map
                  </h5>
                  <PopupMap
                    address={selectedProperty.address}
                    city={selectedProperty.city}
                    country={selectedProperty.country}
                  />
                </div>
              </div>
              {/* Buttons */}
            </div>
          </div>

          <div className="popup-buttons">
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={async (contract) => {
                try {
                  await transferNativeToken({
                    to: selectedProperty.owner,
                    amount: selectedProperty.price,
                  });

                  await contract.call("buyProperty", [
                    selectedProperty._id,
                    buyer, // Use the variable here
                  ]);
                  setShowBuySuccessPopup(true);
                } catch (error) {
                  if (error.message === "user rejected transaction") {
                    console.log("User rejected transaction");
                  } else {
                    console.error(
                      "Error transferring tokens or buying property:",
                      error
                    );
                  }
                }
              }}
            >
              Buy Property
            </Web3Button>

            <button className="closeButton" onClick={closePopup}>
              {" "}
              Close
            </button>
          </div>
        </div>
      )}
{showBuySuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <p>Property Bought successfully! &#10004;</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
