
import React, { useContext, useState } from "react";
import { LabelContext } from "./AddProperty";
import "./AddLocation.css"

const AddLocation = () => {
  console.log("Rendering AddLocation");
  const value = useContext(LabelContext);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleNextClick = () => {

    if (!value.formData.country || !value.formData.city || !value.formData.address) {
      setError("Please fill in all the fields before proceeding.");
      return; 
    }

    // if (value.formData.images.length === 0) {
    //   setError("Please select at least one image");
    //   return;
    // }

    console.log("Before update:", value.formData);
    value.setFormData((prevFormData)=>({
      ...prevFormData,
      location:{
      country,
      city,
      address,
    },
    }));

    setError("");
    console.log("After update:", value.formData);
    value.nextPage(); 
  };

  return (
    <div>
    <form>
      <h4>Enter the address of the property</h4>

      <div className="input-fields">
        <label htmlFor="country">Enter Country</label>
        <br />
        <input
          id="country"
          value={value.formData.country}
          onChange={(e) => value.handleChange("country")(e)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="city">Enter City</label>
        <br />
        <input
          id="city"
          value={value.formData.city}
          onChange={(e) => value.handleChange("city")(e)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="address">Enter Address</label>
        <br />
        <input
          id="address"
          value={value.formData.address}
          onChange={(e) => value.handleChange("address")(e)}
        />
      </div>

      {error && (<p style={{ color: 'red' ,margin: 0 }}>{error}</p>)}

      <button
        onClick={handleNextClick}
        style={{ margin: 25 }}
        // disabled={!value.formData.country || !value.formData.city || !value.formData.address}
        className="next-button"
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