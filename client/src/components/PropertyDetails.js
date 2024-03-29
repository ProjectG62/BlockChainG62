import React, { useContext, useState } from "react";
import { LabelContext } from "./ConfirmDetails";
import "./PropertyDetails.css"

const PropertyDetails = () => {
  const value = useContext(LabelContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");


  const handleNextClick = (e) => {
    e.preventDefault();
    e.target.form.reportValidity();
    if (value.formData.price <= 0) {
      setError("Price should be greater than 0.");
      return; 
    }

    value.nextPage();
  };

  return (
    <form>
      <h4>Enter Property Details</h4>

      <div className="input-fields">
        <label htmlFor="title">Property Title<span style={{color:"red"}}>*</span></label>
        <br />
        <input
          id="title"
          value={value.formData.title}
          onChange={(e) => value.handleChange("title")(e)}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="description">Property Description<span style={{color:"red"}}>*</span></label>
        <br />
        <textarea
          id="description"
          cols={50}
          rows={5}
          value={value.formData.description}
          onChange={(e) => value.handleChange("description")(e)}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="price">Property Price<span style={{color:"red"}}>*</span></label>
        <br />
        <input
          id="price"
          type="number"
          value={value.formData.price}
          onChange={(e) => value.handleChange("price")(e)}
          required
        />
      </div>
    
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => value.prevPage()} style={{ margin: 25 }} className="previous-button">
        Previous
      </button>

      <button
        onClick={handleNextClick}
        style={{ margin: 25 }}
        // disabled={!value.formData.title || !value.formData.description || !value.formData.price}
        className="next-button"
      >
        Next
      </button>
    </form>
  );
};

export default PropertyDetails;
