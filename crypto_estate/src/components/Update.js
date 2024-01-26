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
const { ethers } = require("ethers");
const Update = () => {
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );

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
        image: propertyData.images[0],
        facilities: {
          bathrooms: parseInt(propertyData.nBathrooms._hex, 16),
          parking: parseInt(propertyData.nParking._hex, 16),
          bedrooms: parseInt(propertyData.nRooms._hex, 16),
        },
      }));
      const filteredProperties = tempJsonData.filter((property) => !property.sold);
      setJsonData(filteredProperties);
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
          await updatePrice({ args: [selectedProperty._id, ethers.utils.parseUnits(popupInput.toString(), 18)] });
          break;
        case "updateTitle":
          await updateTitle({ args: [selectedProperty._id, popupInput] });
          break;
        default:
          break;
      }

      closePopup();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };
  

  return (
    <div className="property-page">
      <div className="properties-container">
        { JsonData.map((property) => (
          <div key={property._id} className="property-item property-card">
            <img src={property.image} alt={property.title} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">
                {property.address}, {property.city}, {property.country}
              </div>
            </div>

            <button className="viewButton" onClick={() => openPopup(property, "updateImage")}>
              Update Image
            </button>

            <button className="viewButton" onClick={() => openPopup(property, "updateDescription")}>
              Update Description
            </button>

            <button className="viewButton" onClick={() => openPopup(property, "updatePrice")}>
              Update Price
            </button>

            <button className="viewButton" onClick={() => openPopup(property, "updateTitle")}>
              Update Title
            </button>
          </div>
        ))}
      </div>

      {selectedProperty && selectedUpdateType && (
        <div className="popup-container">
          <div className="popup-body">
            <div className="popup-header">
              <div className="popup-content">
                <h2>{selectedProperty.title}</h2> <br />
                <p>{selectedProperty.description}</p>
                <p>
                  <br />
                  Address:<br></br> {selectedProperty.address}, {selectedProperty.city},{" "}
                  {selectedProperty.country}
                </p>{" "}
                <br />
                <p>
                  Facilities:<br></br> Bathrooms: {selectedProperty.facilities.bathrooms},
                  Parking: {selectedProperty.facilities.parking}, Bedrooms:{" "}
                  {selectedProperty.facilities.bedrooms}
                </p>
              </div>

              <div>
                <ImageSlider selectedProperty={selectedProperty} />
                <p
                  style={{
                    fontWeight: "bolder",
                    textAlign: "center",
                    paddingTop: "1rem",
                    fontSize: "30px",
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
              </div>

              <div className="popup-buttons">
                <input
                  type="text"
                  value={popupInput}
                  onChange={(e) => setPopupInput(e.target.value)}
                />
                <button className="updateButton" onClick={handleUpdate}>
                  Update
                </button>
                <button className="closeButton" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
