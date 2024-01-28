import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
// import connectWallet from "./FetchId";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({
    src: "https://res.cloudinary.com/duwadnxwf/image/upload/v1704953273/icons8-hamburger-50_2_c837d6.png",
  });

  const handleClick = () => {
    setCurrentImg((prevImg) => ({
      src:
        prevImg.src ===
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1704953273/icons8-hamburger-50_2_c837d6.png"
          ? "https://res.cloudinary.com/duwadnxwf/image/upload/v1704953389/icons8-x-50_2_o0syv8.png"
          : "https://res.cloudinary.com/duwadnxwf/image/upload/v1704953273/icons8-hamburger-50_2_c837d6.png",
    }));
  };
  const address = useAddress();
  // const handleConnectWallet = async () => {
  //   const address = await connectWallet();
  //   setWalletAddress(address);
  // };

  return (
    <nav>
      <Link to="/" className="title">
        <img
          src="https://res.cloudinary.com/duwadnxwf/image/upload/v1704952640/logo2_qwzmn1.png"
          className="logo_container"
          width={95}
          height={70}
          alt="Logo"
        />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <img
          src={currentImg.src}
          alt="ham"
          className="ham"
          onClick={handleClick}
        ></img>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      
          <li>
           <NavLink to = "/Ledger">Ledger</NavLink>
          </li>
        
        
        <li>
          <NavLink to="/Buy_Property">Buy Property</NavLink>
        </li>
        <li>
          <NavLink to="/Sell_Property">Sell Property</NavLink>
        </li>
        <li>
          <NavLink to="/AboutUs">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/LoginForm">Login</NavLink>
        </li>
        {address && (
          <li>
            <NavLink to="/user/activepage">Profile</NavLink>
          </li>
        )}

        <li>
          <ConnectWallet />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
