import React from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons library

const ContactUs = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "45vh",
        color: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "3%" }}>
        <h3>Contact Us</h3>
        <p style={{ paddingTop: "0.3rem" }}>
          <FaInstagram style={{ marginRight: "10px" }} />
          Instagram
        </p>
        <p>
          <FaEnvelope style={{ marginRight: "10px" }} />
          g62.ps.2.1@gmail.com
        </p>
      </div>
      <div style={{ marginRight: "4%" }}>
        <h4>Payment Option </h4>
        <p>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/metamask-logo.png"
            alt="metamask-logo"
          />

          <img
            width="50"
            height="50"
            src="https://res.cloudinary.com/duwadnxwf/image/upload/v1706530318/icons8-matic-64_1_l35kkj.png"
            alt="external-Matic-cryptocurrency-black-fill-lafs"
          />
        </p>
      </div>
    </div>
  );
};

export default ContactUs;