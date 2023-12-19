import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const refreshPage = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    window.addEventListener("resize", showButton);
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img
            src="../logo.png"
            className="logo_container"
            width={100}
            height={50}
            alt="Logo"
          />
        </Link>
        <div className="flexCenter h-menu">
          <div className="spacing"></div>
          <Link to="/Buy_Property" className="a-link">
            Buy Property
          </Link>
          <Link to="/Sell_Property" className="a-link">
            Sell Property
          </Link>
          <Link to="/Profile" className="a-link">
            Profile
          </Link>
          <button className="button" onClick={connectWallet}>
            <span>
              {walletAddress.length > 0
                ? `Connected: ${walletAddress.substring(
                    0,
                    6
                  )}...${walletAddress.substring(38)}`
                : "Connect"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
