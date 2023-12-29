
import React, { useContext, useState } from "react";
import { LabelContext } from "./AddPropertyModal";

const AddLocation = () => {
  console.log("Rendering AddLocation");
  const value = useContext(LabelContext);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleNextClick = () => {
    console.log("Before update:", value.formData);
    value.setFormData((prevFormData)=>({
      ...prevFormData,
      country,
      city,
      address,
    }));

    console.log("After update:", value.formData);
    value.nextPage(); 
  };

  return (
    <div>
    <form className="width-50">
      <h4>Enter the address of the property</h4>

      <div className="input-fields">
        <label htmlFor="country">Enter Country</label>
        <br />
        <input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="city">Enter City</label>
        <br />
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="address">Enter Address</label>
        <br />
        <input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        onClick={handleNextClick}
        style={{ margin: 25 }}
        disabled={!country || !city || !address}
      >
        Next
      </button>
    </form>
    <div className="map">

    </div>
    </div>
  );
};

export default AddLocation;