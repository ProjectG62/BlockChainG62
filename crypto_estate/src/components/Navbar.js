import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import connectWallet from "./FetchId";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [currentImg, setCurrentImg] = useState({
    src: "https://res.cloudinary.com/duwadnxwf/image/upload/v1704645765/icons8-hamburger-50_1_n0orei.png",
  });

  const handleClick = () => {
    setCurrentImg((prevImg) => ({
      src:
        prevImg.src ===
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1704645765/icons8-hamburger-50_1_n0orei.png"
          ? "https://res.cloudinary.com/duwadnxwf/image/upload/v1704550811/icons8-x-50_vc1cop.png"
          : "https://res.cloudinary.com/duwadnxwf/image/upload/v1704645765/icons8-hamburger-50_1_n0orei.png",
    }));
  };

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setWalletAddress(address);
  };

  return (
    <nav>
      <Link to="/" className="title">
        <img
          src="https://res.cloudinary.com/duwadnxwf/image/upload/v1704552262/logo_eazfqp.png"
          className="logo_container"
          width={100}
          height={50}
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
          <NavLink to="/Buy_Property">Buy Property</NavLink>
        </li>
        <li>
          <NavLink to="/Sell_Property">Sell Property</NavLink>
        </li>
        <li>
          <NavLink to="/AboutUs">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/user/activepage">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/LoginForm">Login</NavLink>
        </li>
        <li>
          <button className="button" onClick={handleConnectWallet}>
            <span>
              {walletAddress.length > 0
                ? `Connected: ${walletAddress.substring(
                    0,
                    6
                  )}...${walletAddress.substring(38)}`
                : "Connect"}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
