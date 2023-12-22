import React from "react";
import AddPropertyModal from "../AddPropertyModal";
import { LabelContextProvider } from "../AddPropertyModal";

function Sell_Property() {
  return (<LabelContextProvider>
  <AddPropertyModal />
</LabelContextProvider>);
}

export default Sell_Property;
