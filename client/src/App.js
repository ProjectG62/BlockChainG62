import "./App.css";
import "./index.css";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import Buy_Property from "./components/pages/Buy_Property";
import Sell_Property from "./components/pages/Sell_Property";
import Profile from "./components/pages/Profile";
import Ledger from "./components/pages/Ledger";
import AboutUs from "./components/pages/AboutUs";
import FAQs from "./components/pages/FAQs";
import { LabelContextProvider } from "./components/ConfirmDetails";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const activeChain = "mumbai";

function App() {
  return (
    <ThirdwebProvider
      clientId={process.env.REACT_APP_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Router>
        <LabelContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Buy_Property" element={<Buy_Property />} />
            <Route path="/Sell_Property" element={<Sell_Property />} />
            <Route path="/user/:activepage" element={<Profile />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Ledger" element={<Ledger />} />
            <Route path="/FAQs" element={<FAQs />} />
          </Routes>
        </LabelContextProvider>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
