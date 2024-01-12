// Team.js
import React, { useEffect } from "react";
import "./Team.css";

const Team = () => {
  const teamMembers = [
    {
      name: "Kasibhatla Sankeerthi",
      imageUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1700474850/cld-sample.jpg",
    },
    {
      name: "Perepu Kavya Sri",
      imageUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1700474850/cld-sample.jpg",
    },
    {
      name: "K Saroja Sreenidhi",
      imageUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1700474850/cld-sample.jpg",
    },
    {
      name: "Pujitha Kondapally",
      imageUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1700474850/cld-sample.jpg",
    },
    {
      name: "Rishika Gudla",
      imageUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1700474850/cld-sample.jpg",
    },
    {
      name: "Padigela Vaidika",
      imageUrl:
        "https://res.cloudinary.com/duwadnxwf/image/upload/v1700474850/cld-sample.jpg",
    },
    // Add more team members as needed
  ];

  useEffect(() => {
    const revealCards = () => {
      const teamCards = document.querySelectorAll(".team-card");

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

      teamCards.forEach((card) => {
        observer.observe(card);
      });
    };

    revealCards();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="team-wrapper">
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="team-member-img"
            />
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "20px",
                paddingTop: "1rem",
                color: "rgba(0, 0, 0, 0.591)",
                fontWeight: "600",
              }}
            >
              {member.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
