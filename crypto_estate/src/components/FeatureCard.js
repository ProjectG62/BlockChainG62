// FeatureCard.js
import React from "react";
const FeatureCard = ({ featureName, description, iconUrl }) => {
  return (
    <div className="feature-card">
      <img src={iconUrl} alt={`${featureName} icon`} className="feature-icon" />
      <h3
        className="feature-name"
        style={{
          fontSize: "25px",
          color: "rgba(0, 0, 0, 0.591)",
          marginBottom: "10px",
        }}
      >
        {featureName}
      </h3>
      <p
        className="feature-description"
        style={{
          fontSize: "17px",
          color: "rgba(0, 0, 0, 0.591)",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
