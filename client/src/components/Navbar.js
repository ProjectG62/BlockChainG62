import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <section className="h-wrapper">
      <div className="flexCentre innerWidth h-container">
        <div className="flexCentre h-menu">
          <img
            src="../logo_final.png"
            alt="logo"
            className="logo"
            width={160}
          />
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
          <button className="button connect">CONNECT WALLET</button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
