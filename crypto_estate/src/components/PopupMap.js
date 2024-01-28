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

          const marker = L.marker([lat, lng]).addTo(map);

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
      style={{ height: "350%", width: "200%" }}
    ></div>
  );
};

export default PopupMap;
