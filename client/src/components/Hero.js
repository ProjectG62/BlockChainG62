import React from "react";
import "./Hero.css";
import SearchBar from "./SearchBar";
const Hero = () => {
  return (
    <div className="background-container">
      <h1 className=" flexCenter text-on-img">
        Find the <br />
        Perfect Property,
        <br />
        Anywhere.
      </h1>
      <p className="flexCenter text-on-img-mini">
        revolutionizing the world of Real Estate
        <br />
        using the secure and transparent blockchain network.
      </p>
      <div className="search-box">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
