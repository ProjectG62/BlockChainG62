import React, { useEffect } from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="menu">
          <p
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "70px",
              fontWeight: "800",
            }}
          >
            {" "}
            ABOUT US
          </p>
          <p className="content">
            Welcome to CryptoEstate! where innovation meets tradition, and real
            estate transactions are redefined for the digital age. Our Platform
            empowers users to seamlessly Buy, Sell, and Lease properties,
            revolutionizing the world of Real Estate using the secure and
            transparent blockchain network. Whether you're in search of your
            dream home, a prime commercial space, or an investment opportunity,
            CryptoEstate offers an array of property categories to cater to your
            unique needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
