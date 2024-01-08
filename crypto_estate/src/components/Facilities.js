import React, { useContext, useState } from "react";
import { LabelContext } from "./AddProperty";
import "./Facilities.css"

const Facilities = () => {
  const value = useContext(LabelContext);

  const [numRooms, setNumRooms] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [numParkingSpaces, setNumParkingSpaces] = useState("");

  const handleSubmit = () => {
    // Update the context's formData state
    // value.setFormData({
    //   ...value.formData,
    //   numRooms,
    //   numBathrooms,
    //   numParkingSpaces,
    // });

    // Perform any additional actions, such as submitting the form data
    // ...

    // For this example, let's log the form data to the console
    console.log("Form Data:", value.formData);
  };

  return (
    <form>
      <h4>Enter Property Details</h4>

      <div className="input-fields">
        <label htmlFor="numRooms">Number of Rooms</label>
        <br />
        <input
          id="numRooms"
          type="number"
          value={value.formData.numRooms}
          onChange={(e) => value.handleChange("numRooms")(e)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="numBathrooms">Number of Bathrooms</label>
        <br />
        <input
          id="numBathrooms"
          type="number"
          value={value.formData.numBathrooms}
          onChange={(e) => value.handleChange("numBathrooms")(e)}
        />
      </div>

      <div className="input-fields">
        <label htmlFor="numParkingSpaces">Number of Parking Spaces</label>
        <br />
        <input
          id="numParkingSpaces"
          type="number"
          value={value.formData.numParkingSpaces}
          onChange={(e) => value.handleChange("numParkingSpaces")(e)}
        />
      </div>

      <button onClick={() => value.prevPage()} style={{ margin: 25 }} className="previous-button">
        Previous
      </button>

      <button onClick={handleSubmit} style={{ margin: 25 }} className="submit-button" >
        Submit
      </button>
    </form>
  );
};

export default Facilities;
