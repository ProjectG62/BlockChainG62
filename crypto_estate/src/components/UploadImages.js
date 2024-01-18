import React, { useContext, useState , useRef } from "react";
import { LabelContext } from "./ConfirmDetails";
import "./UploadImages.css"

const UploadImages = () => {
  const value = useContext(LabelContext);
  const fileInputRef = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (files) {
      const imagesArray = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagesArray).then((images) => {
        // setSelectedImages(images);
        value.setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...images], // Append new images to existing ones
        }));
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleNextClick = () => {
    if (value.formData.images.length === 0) {
      setError("Please select at least one image");
      return;
    }

    value.setFormData((prevData) => ({
      ...prevData,
      images: value.formData.images,
    }));

    setError(""); // Clear the error if any
    value.nextPage(); // Move to the next step
  };

  return (
    <div>
      <h4>Upload images of the property</h4>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />

      <div className="custom-file-input-container">
        <button onClick={handleClick} className="next-button">
          Choose File
        </button>
      </div>


      {value.formData.images.length > 0 && (
        <div>
          <h3>Selected Images:</h3>
          <div>
            {value.formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br/>

      <button onClick={() => value.prevPage()} style={{ margin: 25 }} className="previous-button">
        Previous
      </button>

      <button onClick={handleNextClick} style={{ margin: 25 }} className="next-button">
        Next
      </button>
    </div>
  );
};

export default UploadImages;
