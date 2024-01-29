// Team.js
import React, { useEffect } from "react";
import FeatureCard from "./FeatureCard"; // Import the new FeatureCard component
import "./Features.css";

const Features = () => {
  const features = [
    {
      featureName: "Like Property",
      description:
        "Users can express interest in properties by liking them and adding them to their wishlist. This curated collection can be conveniently accessed and managed on their profile page, allowing for seamless navigation to desired properties directly from the profile interface.",
      iconUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/c_crop,h_500/v1706368066/user-friendly_tgzavf.png",
    },
    {
      featureName: "Maps",
      description:
        "The Maps component provides an interactive map interface, enhancing the user experience by offering a comprehensive view of the property's geographical context. Moreover, users can access the map directly from the Buy Property page. ",
      iconUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1706369317/pin-map_dlm8rg.png",
    },
    {
      featureName: "Ledgers",
      description:
        "The personalized ledger system presents a detailed record of user-initiated transactions, ensuring transparency and instilling confidence in the successful execution and recording of each transaction.",
      iconUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1706369844/ledger_m9kkgq.png",
    },
    {
      featureName: "Property Management",
      description:
        "The platform enables property owners to easily update and manage their listings. Users can access a dedicated profile page for quick insights into their transaction history, tracking both sold and purchased properties with ease.",
      iconUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1706371178/fund_fidfct.png",
    },
  ];

  useEffect(() => {
    const revealCards = () => {
      const featureCards = document.querySelectorAll(".feature-card");

      const options = {
        threshold: 0.5, // Adjust this value based on your requirement
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      }, options);

      featureCards.forEach((card) => {
        observer.observe(card);
      });
    };

    revealCards();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="feature-wrapper">
      <div className="feature-cards-container">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            featureName={feature.featureName}
            description={feature.description}
            iconUrl={feature.iconUrl}
            className="feature-card"
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
