import "./App.css";
import "./index.css";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import LoginForm from "./components/pages/LoginForm";
import Buy_Property from "./components/pages/Buy_Property";
import Sell_Property from "./components/pages/Sell_Property";
import Profile from "./components/pages/Profile";
import AboutUs from "./components/pages/AboutUs";
import { LabelContextProvider } from "./components/AddProperty";
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
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
        </LabelContextProvider>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
