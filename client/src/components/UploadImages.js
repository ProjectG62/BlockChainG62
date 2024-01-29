
import React, { useContext, useState , useRef } from "react";
import { LabelContext } from "./ConfirmDetails";
import "./UploadImages.css"

const UploadImages = () => {
  const value = useContext(LabelContext);

  const [error, setError] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleNextClick = (e) => {
    e.preventDefault();
    if (value.formData.images === "") {
      setError("Please enter a valid image URL");
      return;
    }

    setError("");
    value.nextPage(); 
  };


  return (
    <div>
      <h4>Upload image URL of the property</h4>
    <form>
      <div className="custom-file-input-container">
        <input
          id="imageUrlInput"
         
          value={value.formData.images}
          onChange={(e) => value.handleChange("images")(e)}
          placeholder="Enter Image URL"
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br/>

      <button onClick={() => value.prevPage()} style={{ margin: 25 }} className="previous-button">
        Previous
      </button>

      <button onClick={handleNextClick} style={{ margin: 25 }} className="next-button">
        Next
      </button>
      </form>
    </div>
  );
};

export default UploadImages;

