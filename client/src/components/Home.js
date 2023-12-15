import React from "react";
import "./Home.css";
import SearchBar from "./SearchBar";
const Home = () => {
  return (
    <section className="home-wrapper">
      <div className="padding innerWidth flexCenter home-container">
        <div className="home-right">
          <div className="img">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
