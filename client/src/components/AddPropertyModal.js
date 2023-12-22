import React, { createContext, useState, useContext } from "react";
import Stepper from "react-stepper-horizontal";
import "./AddPropertyModal.css"

const LabelContext = createContext();

const LabelContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  const contextValue = {
    page,
    setPage,
    steps,
  };

  return <LabelContext.Provider value={contextValue}>{children}</LabelContext.Provider>;
};

const AddPropertyModal = (props) => {
  const value = useContext(LabelContext);

  return (
    <div className="AddPropertyModal">
      {value.page !== 5 && <Stepper steps={value.steps} activeStep={value.page} stepClassName="custom-step"/>}
      {value.page === 0 && <div>Page 0 content</div>}
      {value.page === 1 && <div>Page 1 content</div>}
      {value.page === 2 && <div>Page 2 content</div>}
      {value.page === 3 && <div>Page 3 content</div>}
      {value.page === 4 && <div>Page 4 content</div>}
      {value.page === 5 && <div>Page 5 content</div>}
    </div>
  );
};

export { LabelContext, LabelContextProvider };
export default AddPropertyModal;
