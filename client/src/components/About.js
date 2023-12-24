import React from "react";
import "./About.css";
function About() {
  return (
    <div className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColCenter menu">
          <div className="menu-left">
            <h1 className="title">ABOUT US</h1>
            <p className="content">
              Welcome to CryptoEstate! where innovation meets tradition, <br />
              and real estate transactions are redefined for the digital age.
              <br />
              Our Platform empowers users to seamlessly Buy, Sell,
              <br />
              and Lease properties, revolutionizing the world of Real Estate
              <br /> using the secure and transparent blockchain network.
              <br />
              Whether you're in search of your dream home, a prime
              <br />
              commercial space, or an investment opportunity, <br />
              CryptoEstate offers an array of property categories to cater
              <br /> to your unique needs.
            </p>
          </div>
          <div className=" menu-right">
            <img src="../bc.png" width={520} height={260} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;