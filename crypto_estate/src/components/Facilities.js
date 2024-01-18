import React, { useContext, useState } from "react";
import { LabelContext } from "./ConfirmDetails";
import "./Facilities.css";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./pages/addresses";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

const Facilities = () => {
  const value = useContext(LabelContext);
  const address = useAddress();
  const [error, setError] = useState("");

  // const [numRooms, setNumRooms] = useState("");
  // const [numBathrooms, setNumBathrooms] = useState("");
  // const [numParkingSpaces, setNumParkingSpaces] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // value.setFormData({
  //   //   ...value.formData,
  //   //   numRooms,
  //   //   numBathrooms,
  //   //   numParkingSpaces,
  //   // });
  //   console.log("Form Data:", value.formData);
  // };

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
    // value.setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   location: {
    //     country,
    //     city,
    //     address,
    //   },
    // }));

    setError("");
    value.nextPage();
  };

  const { contract } = useContract(
    "0xA21438A8654A85EEABa5b3715c239105C466CaF9"
  );
  return (
    <form onSubmit={value.handleSubmit}>
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

      <button
        onClick={() => value.prevPage()}
        style={{ margin: 25 }}
        className="previous-button"
      >
        Previous
      </button>

      <button
          onClick={handleNextClick}
          style={{ margin: 25 }}
          className="next-button"
        >
          Next
        </button>
    </form>
  );
};

export default Facilities;
