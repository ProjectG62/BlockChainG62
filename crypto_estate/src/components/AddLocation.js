import React, { useContext, useState, useEffect, useRef } from "react";
import { LabelContext } from "./ConfirmDetails";
import "./AddLocation.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Map from './Map.js'

const AddLocation = () => {
  const value = useContext(LabelContext);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleNextClick = (e) => {
    e.preventDefault();
    e.target.form.reportValidity(); //added this line to show error message before moving to the next page
    if (
      !value.formData.country ||
      !value.formData.city ||
      !value.formData.address
    ) {
      // setError("Please fill in all the fields before proceeding.");
      return;
    }
    setError("");
    value.nextPage();
  };

  const handleLocation = (e) => {
    e.preventDefault();
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
            required //added required
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
            required //added required
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
            required //added required
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
      <Map></Map>
    </div>
  );
};

export default AddLocation;
