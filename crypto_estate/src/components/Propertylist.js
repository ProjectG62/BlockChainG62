import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import {
  useTransferNativeToken,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import axios from "axios";
import "./Propertylist.css";
import SearchBar from "./SearchBar";
import ImageSlider from "./ImageSlider";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./pages/addresses";
import Loading from "./Loading";
import LikedArray from "./LikedArray";

const Propertylist = () => {
  const { contract } = useContract(
    "0x93E8DD8a558ea662791751FAAE4354EDb5399A91"
  );

  // Note: LikedArray is a component, not a function. It should be rendered to get its data.
  const { likeList } = LikedArray();
  const [likedProperties, setLikedProperties] = useState([]);

  useEffect(() => {
    // Initialize likedProperties after likeList is available
    setLikedProperties(likeList);
  }, [likeList]);

  const a = useAddress();
  const [JsonData, setJsonData] = useState([]);
  const { data, isLoading } = useContractRead(contract, "getAllProperties");

  const buyer = useAddress();
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
      price: parseInt(propertyData[2]._hex, 16) * 10 ** -18,
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

    setJsonData(tempJsonData);

    axios
      .post("http://localhost:5000/saveJson", tempJsonData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }, [data, isLoading]);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(JsonData);

  useEffect(() => {
    // Update filteredProperties with processed data
    setFilteredProperties(JsonData);
  }, [JsonData]);

  const openPopup = (property) => {
    setSelectedProperty(property);
  };

  const closePopup = () => {
    setSelectedProperty(null);
  };

  const handleLike = async (propertyId) => {
    try {
      if (likedProperties.includes(propertyId)) {
        const confirmation = window.confirm(
          "Are you sure you want to remove this property from liked?"
        );
        if (confirmation) {
          const tx = await contract.call("removeLike", [propertyId]);
          await tx.wait();

          setLikedProperties((prevLikedProperties) =>
            prevLikedProperties.filter((id) => id !== propertyId)
          );
        }
      } else {
        const tx = await contract.call("addLike", [propertyId]);
        await tx.wait();

        setLikedProperties((prevLikedProperties) => [
          ...prevLikedProperties,
          propertyId,
        ]);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = JsonData.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.price.toString().includes(searchTerm) ||
        property.country.toString().includes(searchTerm) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const { mutate: transferNativeToken, error } = useTransferNativeToken();

  if (error) {
    console.error("Failed to transfer tokens", error);
  }

  return (
    <div className="property-page">
      <SearchBar onSearch={handleSearch} />
      <div className="properties-container">
        {isLoading && <Loading></Loading>}
        {filteredProperties.map((property) => (
          <div key={property._id} className="property-item property-card">
            <AiFillHeart
              size={24}
              color={likedProperties.includes(property._id) ? "red" : "white"}
              onClick={() => handleLike(property._id)}
              className="like-container"
            />
            <img src={property.image} alt={property.title} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">
                {property.address}, {property.city}, {property.country}
              </div>
            </div>

            <button className="viewButton" onClick={() => openPopup(property)}>
              View Property
            </button>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div className="popup-container">
          <div className="popup-body">
            <div className="popup-header">
              <div className="popup-content">
                <h2>{selectedProperty.title}</h2> <br />
                <p>{selectedProperty.description}</p>
                <p>
                  <br />
                  Address:<br></br> {selectedProperty.address},{" "}
                  {selectedProperty.city}, {selectedProperty.country}
                </p>{" "}
                <br />
                <p>
                  Facilities:<br></br> Bathrooms:{" "}
                  {selectedProperty.facilities.bathrooms}, Parking:{" "}
                  {selectedProperty.facilities.parking}, Bedrooms:{" "}
                  {selectedProperty.facilities.bedrooms}
                </p>
              </div>

              <div>
                {/* Assuming sliderImages is part of selectedProperty */}
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
                <Web3Button
                  contractAddress="0x93E8DD8a558ea662791751FAAE4354EDb5399A91"
                  action={(contract) => handleLike(selectedProperty._id)}
                >
                  {likedProperties.includes(selectedProperty._id)
                    ? "Remove Like"
                    : "Like"}
                </Web3Button>

                <Web3Button
                  contractAddress={CONTRACT_ADDRESS}
                  action={async (contract) => {
                    try {
                      const tx = await transferNativeToken({
                        to: selectedProperty.owner,
                        amount: selectedProperty.price,
                      });

                      // Wait for the transaction to be mined
                      await tx.wait();

                      // If no error occurred, print "Hello, World!"
                      // Call your buyProperty function after successful transfer
                      await contract.call("buyProperty", [
                        selectedProperty._id,
                        buyer,
                      ]);
                    } catch (error) {
                      console.error("Error transferring tokens:", error);
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Propertylist;
