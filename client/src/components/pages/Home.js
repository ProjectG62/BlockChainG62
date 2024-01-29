import React from "react";
import Hero from "../Hero";
import MostLiked from "../MostLiked.js";
import ContactUs from "../ContactUs.js";
function Home() {
  return (
    <div>
      <Hero></Hero>
      <MostLiked></MostLiked>
      <ContactUs></ContactUs>
    </div>
  );
}

export default Home;