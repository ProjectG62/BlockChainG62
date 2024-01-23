import { Web3Button, useAddress } from "@thirdweb-dev/react";
import React, { createContext, useState, useContext } from "react";
import { CONTRACT_ADDRESS } from "./pages/addresses";

const { ethers } = require("ethers");
const LabelContext = createContext();

const LabelContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [updateMapFlag, setUpdateMapFlag] = useState(0);

  const steps = [
    "Add Location",
    "Add Images",
    "Basic Details",
    "Facilities",
    "Confirm Details",
  ];

  const [formData, setFormData] = useState({
    owner: "",
    country: "",
    city: "",
    address: "",
    title: "",
    description: "",
    price: 0,
    numRooms: 0,
    numBathrooms: 0,
    numParkingSpaces: 0,
    images: [],
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Details Submitted:", formData);
  };

  const updateMap = () => {
    setUpdateMapFlag(true); // Set the flag to trigger map update
  };


  const contextValue = {
    page,
    setPage,
    steps,
    formData,
    updateMapFlag,
    setUpdateMapFlag,
    setFormData,
    handleChange,
    handleSubmit,
    updateMap,

    nextPage: () => {
      setPage(page + 1);
    },

    prevPage: () => {
      setPage(page - 1);
    },
  };

  
  if (updateMapFlag) {
    setUpdateMapFlag(false);
  }


  return (
    <LabelContext.Provider value={contextValue}>
      {children}
    </LabelContext.Provider>
  );
};

function ConfirmDetails() {
  const value = useContext(LabelContext);
  const address = useAddress();
  value.formData.owner = address;
  const handleWeb3ButtonAction = async (contract) => {
    try {
      // Make sure to pass the parameters in the correct order
      await contract.call("listProperty", [
        value.formData.owner,
        ethers.utils.parseUnits(value.formData.price.toString(), 18),
        value.formData.country,
        value.formData.city,
        value.formData.title,
        value.formData.numBathrooms,
        value.formData.numRooms,
        value.formData.numParkingSpaces,
        value.formData.address,
        value.formData.description,
      ]);
      console.log("Property listed successfully!");
    } catch (error) {
      console.error("Error listing property:", error);
      // Handle error appropriately
    }
  };

  return (
    <form onSubmit={value.handleSubmit}>
      <h4>Enter Property Details</h4>

      <div className="input-fields">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={value.formData.price}
          onChange={value.handleChange}
          required
        />
      </div>
      <div className="input-fields">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={value.formData.country}
          onChange={value.handleChange}
          required
        />
      </div>
      <div className="input-fields">
        <label htmlFor="city">city</label>
        <input
          type="text"
          id="city"
          name="city"
          value={value.formData.city}
          onChange={value.handleChange}
          required
        />
      </div>
      <div className="input-fields">
        <label htmlFor="propertyTitle">propertyTitle</label>
        <input
          type="text"
          id="propertyTitle"
          name="propertyTitle"
          value={value.formData.title}
          onChange={value.handleChange}
          required
        />
      </div>
      <div className="input-fields">
        <label htmlFor="numBath">Number of Bath</label>
        <input
          type="number"
          id="numBath"
          name="numBath"
          value={value.formData.numBathrooms}
          onChange={value.handleChange}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="numRooms">Number of Rooms</label>
        <input
          type="number"
          id="numRooms"
          name="numRooms"
          value={value.formData.numRooms}
          onChange={value.handleChange}
          required
        />
      </div>
      <div className="input-fields">
        <label htmlFor="numParking">Number of Parking</label>
        <input
          type="number"
          id="numParking"
          name="numParking"
          value={value.formData.numParkingSpaces}
          onChange={value.handleChange}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="Address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={value.formData.address}
          onChange={value.handleChange}
          required
        />
      </div>
      <div className="input-fields">
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={value.formData.description}
          onChange={value.handleChange}
          required
        />
      </div>
      {/* <Web3Button
        contractAddress={CONTRACT_ADDRESS}
        action={(contract) =>
          contract.call("listProperty", [
            value.formData.price,
            value.formData.country,
            value.formData.city,
            value.formData.title,
            value.formData.numBathrooms,
            value.formData.numRooms,
            value.formData.numParkingSpaces,
            value.formData.address,
            value.formData.description,
          ])
        }
        type="submit"
      >
        SUBMIT
      </Web3Button> */}

      <button
        onClick={() => value.prevPage()}
        style={{ margin: 25 }}
        className="previous-button"
      >
        Previous
      </button>

      <Web3Button
        contractAddress={CONTRACT_ADDRESS}
        action={handleWeb3ButtonAction}
      >
        SUBMIT
      </Web3Button>
    </form>
  );
}

export { LabelContext, LabelContextProvider, ConfirmDetails as default };
