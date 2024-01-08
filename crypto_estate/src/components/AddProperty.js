import React, { createContext, useState, useContext } from "react";
import Stepper from "react-stepper-horizontal";
import "./AddProperty.css"
import AddLocation from "./AddLocation";
import UploadImages from "./UploadImages";
import PropertyDetails from "./PropertyDetails";
import Facilities from "./Facilities";

const LabelContext = createContext();

const LabelContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const steps = ['Add Location', 'Add Images', 'Basic Details', 'Facilities'];

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    title:"",
    description:"",
    price:0,
    numRooms:0,
    numBathrooms:0,
    numParkingSpaces:0,
    images:[]
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const contextValue = {
    page,
    setPage,
    steps,
    formData,
    setFormData,
    handleChange,

    nextPage : () => {
      setPage(page + 1);
    },
  
    prevPage : () => {
      setPage(page - 1);
    }
  
  };

  return <LabelContext.Provider value={contextValue}>{children}</LabelContext.Provider>;
};

const AddPropertyModal = (props) => {
  const value = useContext(LabelContext);

  return (
    <div className="AddPropertyModal">
      {value.page !== 5 && <Stepper steps={value.steps} activeStep={value.page} stepClassName="custom-step"/>}
      {value.page === 0 && <AddLocation></AddLocation>}
      {value.page === 1 && <UploadImages></UploadImages>}
      {value.page === 2 && <PropertyDetails></PropertyDetails>}
      {value.page === 3 && <Facilities></Facilities>}
    </div>
  );
};

export { LabelContext, LabelContextProvider };
export default AddPropertyModal;