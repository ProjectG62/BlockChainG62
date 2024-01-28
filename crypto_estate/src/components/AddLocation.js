import React, { useContext, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import { LabelContext } from "./ConfirmDetails";
import "./AddLocation.css";

const AddLocation = () => {
  const value = useContext(LabelContext);
  const mapContainer = useRef(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Function to create or update the map
  const createOrUpdateMap = (lat, lng) => {
    if (!mapRef.current) {
      // Create the map if it doesn't exist
      const map = L.map(mapContainer.current).setView([lat, lng], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Customize marker options
      const markerOptions = {
        icon: L.icon({
          iconUrl: 'https://static.vecteezy.com/system/resources/previews/016/314/852/original/map-pointer-icon-gps-location-symbol-maps-pin-location-map-icon-free-png.png', // Specify your custom icon path
          iconSize: [50, 50], // Adjust the size of the icon
          iconAnchor: [15, 30], // Adjust the anchor point of the icon
        }),
      };

      // Save the map instance for future updates
      mapRef.current = map;

      // Add a marker to the map with custom styling
      markerRef.current = L.marker([lat, lng], markerOptions).addTo(mapRef.current);
    } else {
      // Update the existing map view
      mapRef.current.setView([lat, lng], 13);

      // Update the marker position (no need to update styling if it remains the same)
      markerRef.current.setLatLng([lat, lng]);
    }
  };

  // Function to fetch coordinates
  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(`${value.formData.address} ${value.formData.city} ${value.formData.country}`)}&key=a2af0b76b96145988cd274c0a27cdcfc`
      );

      console.log("API call response:", response); // Log the entire API response

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;

        console.log("Coordinates:", lat, lng); // Log the coordinates

        // Call the function to create or update the map
        createOrUpdateMap(lat, lng);
        setError(null); // Reset the error state on successful API response
      } else {
        setError("No coordinates found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setError("Enter correct address to view on map");
    }
  };

  useEffect(() => {
    // Initial map setup
    if (mapContainer.current && !mapContainer.current.hasChildNodes()) {
      fetchCoordinates();
    }
  }, [mapContainer.current, value.formData.address, value.formData.city, value.formData.country]);

  const handleNextClick = (e) => {
    e.preventDefault();
    e.target.form.reportValidity();
    if (!value.formData.country || !value.formData.city || !value.formData.address) {
      setError("Please fill in all the fields before proceeding.");
      return;
    }
    setError("");
    value.nextPage();
  };

  const handleLocation = async (e) => {
    e.preventDefault();
    await fetchCoordinates();
    value.updateMap();
  }

  return (
    <div className="location">
      <form className="form-map" style={{ width: "50vh" }}>
        <h4>Enter the address of the property</h4>

        <div className="input-fields">
          <label htmlFor="country">
            Enter Country<span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            id="country"
            value={value.formData.country}
            onChange={(e) => value.handleChange("country")(e)}
            className="input-element"
            required
          />
        </div>

        <div className="input-fields">
          <label htmlFor="city">
            Enter City<span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            id="city"
            value={value.formData.city}
            onChange={(e) => value.handleChange("city")(e)}
            className="input-element"
            required
          />
        </div>

        <div className="input-fields">
          <label htmlFor="address">
            Enter Address<span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            id="address"
            value={value.formData.address}
            onChange={(e) => value.handleChange("address")(e)}
            className="input-element"
            required
          />
        </div>

        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

        <button
          onClick={handleLocation}
          style={{ margin: 25 }}
          className="check-location-button"
        >
          Check your location
        </button>

        <button
          onClick={handleNextClick}
          style={{ margin: 25 }}
          className="next-button"
        >
          Next
        </button>
      </form>

      <div id="map" ref={mapContainer} style={{ height: "400px", width: "40vw" }}></div>
    </div>
  );
};

export default AddLocation;
