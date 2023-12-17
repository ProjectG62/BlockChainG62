import React from "react";
import "./Navbar.css";
import { useState } from 'react';



  const Navbar = () => {
    const [walletAddress, setWallsetAddres] = useState("");

  

    const connectWallet = async() =>{
      if (typeof window != "undefined" && typeof window.ethereum != "undefined")
      { 
        try{
        const accounts = await window.ethereum.request({ method : "eth_requestAccounts"});
        setWallsetAddres(accounts[0]);
        console.log(accounts[0]);
        } catch(err){
         console.error(err.message)
        }
      }
      else{
        console.log("Please install Metamask");
      }
    }


  return (
    <section className="h-wrapper">
      <div className="flexCentre innerWidth h-container">
        <div className="flexCentre h-menu">
          
          <div className="spacing"></div>
          <a href="" className="a-link">
            PROPERTIES
          </a>
          <a href="" className="a-link">
            ADD PROPERTY
          </a>
          <a href="" className="a-link">
            ABOUT US
          </a>
          <button className="button connect" onClick=  {connectWallet} >
          <span >
                  { walletAddress.length > 0
                    ?  `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`
                  : 
                    "Connect Wallet"}
                </span></button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
