import { Web3Button, useAddress , useContract , useContractRead} from "@thirdweb-dev/react";
import React, { createContext, useState, useContext } from "react";
import { CONTRACT_ADDRESS } from "./pages/addresses";
import "./ConfirmDetails.css";

const { ethers } = require("ethers");
const LabelContext = createContext();


const LabelContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [updateMapFlag, setUpdateMapFlag] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [submit,setsubmit] = useState(false);

  const { contract } = useContract("0xECc91bBec0c259ed3F4B6F84914274a363da7ffe");
  const { data, isLoading } = useContractRead(contract, "getAllProperties");
  console.log(data);


  const steps = [
    "Add Location",
    "Add Images",
    "Basic Details",
    "Facilities",
    "Confirm Details",
  ];

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    title: "",
    description: "",
    price: 0,
    numRooms: 0,
    numBathrooms: 0,
    numParkingSpaces: 0,
    images: "",
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
    showPopup,
    setShowPopup,
    data,
    submit,setsubmit,

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
  //  console.log(lastProperty);

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
        ethers.utils.parseUnits(value.formData.price.toString(), 18),
        value.formData.country,
        value.formData.city,
        value.formData.title,
        value.formData.numBathrooms,
        value.formData.numRooms,
        value.formData.numParkingSpaces,
        value.formData.address,
        value.formData.description,
        value.formData.images,
      ]);
      console.log("Property listed successfully!");
      value.setsubmit(true);
      {
        value.setsubmit &&
        value.setShowPopup(true);
      }
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

      {value.showPopup && (
        <div className="popup">
        <div className="popup-content">
          <p>Property added successfully! &#10004;</p>
        </div>
      </div>
      )}
    </form>
  );
}

export { LabelContext, LabelContextProvider, ConfirmDetails as default };
