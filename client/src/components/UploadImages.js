import React, { useContext, useState } from "react";
import { LabelContext } from "./AddPropertyModal";

const UploadImages = () => {
  const value = useContext(LabelContext);

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
        setSelectedImages(images);
      });
    }
  };

  const handleNextClick = () => {
    if (selectedImages.length === 0) {
      setError("Please select at least one image");
      return;
    }

    value.setFormData((prevData) => ({
      ...prevData,
      images: selectedImages,
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
      />

      {selectedImages.length > 0 && (
        <div>
          <h3>Selected Images:</h3>
          <div>
            {selectedImages.map((image, index) => (
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

      <button onClick={() => value.prevPage()} style={{ margin: 25 }}>
        Previous
      </button>

      <button onClick={handleNextClick} style={{ margin: 25 }}>
        Next
      </button>
    </div>
  );
};

export default UploadImages;
