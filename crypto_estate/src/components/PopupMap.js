import React, { useContext, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";  
import { LabelContext } from "./ConfirmDetails";

const PopupMap = ({ address, city, country }) => {
  const value = useContext(LabelContext);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !mapContainer.current.hasChildNodes()) {
      const map = L.map(mapContainer.current).setView([51.505, -0.09], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              `${address} ${city} ${country}`
            )}&key=a2af0b76b96145988cd274c0a27cdcfc`
          );

          const { lat, lng } = response.data.results[0].geometry;

          // Define a custom icon
          const customIcon = L.icon({
            iconUrl: "https://static.vecteezy.com/system/resources/previews/016/314/852/original/map-pointer-icon-gps-location-symbol-maps-pin-location-map-icon-free-png.png", // Provide the path to your custom marker image
            iconSize: [32, 32], // Size of the icon
            iconAnchor: [16, 32], // Anchor point of the icon (centered, bottom)
            popupAnchor: [0, -32], // Anchor point for the popup (top center)
          });

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

          marker.bindPopup(value.formData.address).openPopup();

          map.setView([lat, lng], 13);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };

      fetchCoordinates();
    }
  }, [mapContainer.current, address, city, country, value.formData.address]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default PopupMap;