import React, { useContext, useState } from "react";
import { LabelContext } from "./AddPropertyModal";

const PropertyDetails = () => {
  const value = useContext(LabelContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleNextClick = () => {
    // Update the context's formData state
    value.setFormData({
      ...value.formData,
      title,
      description,
      price,
    });

    // Move to the next step
    value.nextPage();
  };

  return (
    <form>
      <h4>Enter Property Details</h4>

      <div className="input-fields">
        <label htmlFor="title">Property Title</label>
        <br />
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="description">Property Description</label>
        <br />
        <textarea
          id="description"
          cols={50}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="price">Property Price</label>
        <br />
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    
      <button onClick={() => value.prevPage()} style={{ margin: 25 }}>
        Previous
      </button>

      <button
        onClick={handleNextClick}
        style={{ margin: 25 }}
        disabled={!title || !description || !price}
      >
        Next
      </button>
    </form>
  );
};

export default PropertyDetails;
