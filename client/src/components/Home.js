import React from "react";
import "./Home.css";
import Navbar from "./Navbar.js"

const Home = () => {
  return (
    <section className="home-wrapper">
       <img
            src="../logo_final.png"
            alt="logo"
            className="logo"
            width={500}
            height={600}
          />
          
      <div className="padding innerWidth flexCenter home-container">
        <div className="home-right">
          
        </div>
       
      </div>
      
    </section>
  );
};

export default Home;
