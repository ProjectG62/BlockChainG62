import React, { useContext, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from 'axios';  // Import Axios for making HTTP requests
import { LabelContext } from "./ConfirmDetails";

const Map = () => {
  const value = useContext(LabelContext);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !mapContainer.current.hasChildNodes()) {
      // Initialize Leaflet map
      const map = L.map(mapContainer.current).setView([51.505, -0.09], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Fetch coordinates using OpenCage Geocoding API
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(`${value.formData.address} ${value.formData.city} ${value.formData.country}`)}&key=a2af0b76b96145988cd274c0a27cdcfc`);
            console.log("API call");
          const { lat, lng } = response.data.results[0].geometry;

          // Create and add marker to the map
          const marker = L.marker([lat, lng]).addTo(map);

          // You can customize the popup content if needed
          marker.bindPopup(value.formData.address).openPopup();
          
          console.log("Coordinates Found");
          // Optionally, you can set the map view to the marker's position
          map.setView([lat, lng], 13);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };

      // Call the fetchCoordinates function
      fetchCoordinates();
    }
  }, [mapContainer.current, value.formData.address, value.formData.city, value.formData.country]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ height: "400px", width: "40vw" }}
    ></div>
  );
};

export default Map;