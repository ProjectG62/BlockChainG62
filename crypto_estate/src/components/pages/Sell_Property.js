
import React from "react";
import AddPropertyModal from "../AddProperty";
import { LabelContextProvider } from "../ConfirmDetails";

function Sell_Property() {
  return (<LabelContextProvider>
  <AddPropertyModal />
</LabelContextProvider>);
}

export default Sell_Property;