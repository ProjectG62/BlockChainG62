import React from "react";
import Hero from "../Hero";
import About from "../About.js";
import MostLiked from "../MostLiked.js";
function Home() {
  return (
    <div>
      <Hero></Hero>
      <MostLiked></MostLiked>
      {/* <About></About> */}
    </div>
  );
}

export default Home;
