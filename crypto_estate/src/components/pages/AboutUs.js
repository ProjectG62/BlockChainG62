import React from "react";
import About from "../About";
import Team from "../Team";
import AboutImg from "../AboutImg";
const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <About></About>
      <AboutImg></AboutImg>
      <Team />
    </div>
  );
};

export default AboutUs;
