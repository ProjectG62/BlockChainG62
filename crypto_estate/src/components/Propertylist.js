import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import axios from "axios";
import "./Propertylist.css";
import SearchBar from "./SearchBar";
import ImageSlider from "./ImageSlider";

const Propertylist = () => {
  const { contract } = useContract(
    "0xA21438A8654A85EEABa5b3715c239105C466CaF9"
  );
  const [JsonData, setJsonData] = useState([]);
  const { data, isLoading } = useContractRead(contract, "getAllProperties");

  useEffect(() => {
    // Check if data is still loading
    if (isLoading) {
      // Data is still loading, do nothing for now
      return;
    }

    // Data has been loaded, process and save
    const tempJsonData = data.map((propertyData) => ({
      _id: parseInt(propertyData[0]._hex, 16),
      title: propertyData[5],
      description: propertyData.description,
      price: parseInt(propertyData[2]._hex, 16) * 10 ** -18,
      address: propertyData.propertyAddress,
      city: propertyData.city,
      country: propertyData.country,
      image: "https://wallpaperaccess.com/full/2315968.jpg",
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
  const [likedProperties, setLikedProperties] = useState([]);
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

  const handleLike = (propertyId) => {
    if (likedProperties.includes(propertyId)) {
      const confirmation = window.confirm(
        "Are you sure you want to remove this property from liked?"
      );
      if (confirmation) {
        setLikedProperties((prevLikedProperties) => {
          return prevLikedProperties.filter((id) => id !== propertyId);
        });
      }
    } else {
      setLikedProperties((prevLikedProperties) => {
        return [...prevLikedProperties, propertyId];
      });
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

  return (
    <div className="property-page">
      <SearchBar onSearch={handleSearch} />

      <div className="properties-container">
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
                <button
                  className="likeButton"
                  onClick={() => handleLike(selectedProperty._id)}
                >
                  Like
                </button>

                <button className="BuyPropBtn"> Buy Property</button>
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
