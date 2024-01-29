import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import {
  useTransferNativeToken,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import "./Propertylist.css";
import ImageSlider from "./ImageSlider";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./pages/addresses";
import Loading from "./Loading";
import PopupMap from "./PopupMap";

const { ethers } = require("ethers");

const Update = () => {
  const { contract } = useContract("0xECc91bBec0c259ed3F4B6F84914274a363da7ffe");

  const x = useAddress();
  const [JsonData, setJsonData] = useState([]);
  const { data, isLoading } = useContractRead(contract, "getUserProperties", [x]);

  const { mutateAsync: updateImage } = useContractWrite(contract, "updateImage");
  const { mutateAsync: updateDescription } = useContractWrite(contract, "updateDescription");
  const { mutateAsync: updatePrice } = useContractWrite(contract, "updatePrice");
  const { mutateAsync: updateTitle } = useContractWrite(contract, "updateTitle");

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [popupInput, setPopupInput] = useState("");
  const [selectedUpdateType, setSelectedUpdateType] = useState(null);

  useEffect(() => {
    try {
      if (!isLoading) {
        const tempJsonData = data.map((propertyData) => ({
          sold: propertyData.sold,
          _id: parseInt(propertyData[0]._hex, 16),
          title: propertyData[5],
          description: propertyData.description,
          price: Number((parseInt(propertyData[2]._hex, 16) * 10 ** -18).toFixed(2)),
          address: propertyData.propertyAddress,
          city: propertyData.city,
          country: propertyData.country,
          imageArray: propertyData.images, // Added propertyData.images as imageArray
          facilities: {
            bathrooms: parseInt(propertyData.nBathrooms._hex, 16),
            parking: parseInt(propertyData.nParking._hex, 16),
            bedrooms: parseInt(propertyData.nRooms._hex, 16),
          },
        }));
        const filteredProperties = tempJsonData.filter((property) => !property.sold);
        setJsonData(filteredProperties);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, isLoading]);

  const openPopup = (property, updateType) => {
    setSelectedProperty(property);
    setSelectedUpdateType(updateType);
  };

  const closePopup = () => {
    setSelectedProperty(null);
    setSelectedUpdateType(null);
  };

  const handleUpdate = async () => {
    try {
      switch (selectedUpdateType) {
        case "updateImage":
          await updateImage({ args: [selectedProperty._id, popupInput] });
          break;
        case "updateDescription":
          await updateDescription({ args: [selectedProperty._id, popupInput] });
          break;
        case "updatePrice":
          await updatePrice({
            args: [
              selectedProperty._id,
              ethers.utils.parseUnits(popupInput.toString(), 18),
            ],
          });
          break;
        case "updateTitle":
          await updateTitle({ args: [selectedProperty._id, popupInput] });
          break;
        default:
          break;
      }
      resetForm();
      closePopup();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const resetForm = () => {
    setPopupInput("");
  };

  if (JsonData.length === 0) {
    return (
      <div
        style={{
          fontSize: "20px",
          textAlign: "center",
          padding: "3rem",
        }}
      >
        No Properties are listed currently!
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
    <div className="property-page">
      <div className="properties-container">
        {JsonData.map((property) => (
          <div key={property._id} className="property-item property-card">
            <img src={property.imageArray[0]} alt={property.title} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">
                {property.address}, {property.city}, {property.country}
              </div>
            </div>

            <button
              className="viewButton"
              onClick={() => openPopup(property, "updateImage")}
              style={{
                padding: "10px 15px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update Image
            </button>

            <button
              className="viewButton"
              onClick={() => openPopup(property, "updateDescription")}
              style={{
                padding: "10px 15px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update Description
            </button>

            <button
              className="viewButton"
              onClick={() => openPopup(property, "updatePrice")}
              style={{
                padding: "10px 15px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update Price
            </button>

            <button
              className="viewButton"
              onClick={() => openPopup(property, "updateTitle")}
              style={{
                padding: "10px 15px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update Title
            </button>
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
                        style={{ width: "90%", height: "50%", borderRadius: "1rem" }}
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
                    Map:
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
          <div className="popup-buttons" style={{zIndex: "2", width: "30%"}}>
                <input
                  type="text"
                  value={popupInput}
                  placeholder="Enter value"
                  onChange={(e) => setPopupInput(e.target.value)}
                />
                <button className="viewButton" onClick={handleUpdate}>
                  Update
                </button>
                <button className="closeButton" onClick={closePopup}>
                  Close
                </button>
              </div>
        </div>
      )}
    </div>
    
  );
};

export default Update;
