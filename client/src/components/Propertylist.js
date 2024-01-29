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
import PopupMap from "./PopupMap";
import "./ConfirmDetails.css";
import Pages from "./Pages";

const PropertiesPerPage = 8;

const Propertylist = () => {
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );

  const { likeList } = LikedArray();
  const [likedProperties, setLikedProperties] = useState([]);

  useEffect(() => {
    setLikedProperties(likeList);
  }, [likeList]);

  const [JsonData, setJsonData] = useState([]);
  const [showBuySuccessPopup, setShowBuySuccessPopup] = useState(false);
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
    console.log("for images", JsonData);

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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(JsonData.length / PropertiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * PropertiesPerPage;
  const endIndex = startIndex + PropertiesPerPage;

  useEffect(() => {
    // Update filteredProperties with processed data
    setFilteredProperties(JsonData.slice(startIndex, endIndex));
  }, [JsonData, startIndex, endIndex]);

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
    console.error("failed to transfer tokens", error);
  }

  useEffect(() => {
    const buySuccessTimeout = setTimeout(() => {
      setShowBuySuccessPopup(false);
    }, 5000);

    return () => clearTimeout(buySuccessTimeout);
  }, [showBuySuccessPopup]);

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
      <Pages
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedProperty && (
        <div className="popup-container">
          <div className="popup-body">
            <div className="popup-header">
              {/* Left Side */}

              <div className="popup-content">
                <div className="mainBox" style={{ fontSize: "17px" }}>
                  <div style={{ width: "49%" }}>
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
                    <h5
                      style={{ paddingTop: "0.5rem", color: "rgb(102, 62, 2)" }}
                    >
                      {" "}
                      Map:<p> (Scroll down to view location on Map)</p>
                    </h5>
                  </div>

                  {/* Right Side */}
                  <div className=" prices">
                    {selectedProperty.imageArray.length === 1 ? (
                      <img
                        src={selectedProperty.imageArray[0]}
                        alt={`property image ${selectedProperty._id}`}
                        className="single-image"
                        style={{
                          width: "90%",
                          height: "70%",
                          borderRadius: "1rem",
                        }}
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
              contractAddress="0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
              action={async (contract) => {
                try {
                  await handleLike(selectedProperty._id);
                } catch (error) {
                  if (error.message === "user rejected transaction") {
                    console.log("User rejected transaction");
                  } else {
                    console.error("Error handling like:", error);
                  }
                }
              }}
            >
              {likedProperties.includes(selectedProperty._id)
                ? "Remove Like"
                : "Like"}
            </Web3Button>

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
          <div>
            <p>Property Bought successfully! &#10004;</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Propertylist;
