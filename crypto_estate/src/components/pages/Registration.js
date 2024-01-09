import React from "react";
import "./Registration.css";
const Registration = () => {
  return (
    <div className="register">
    <div className="wrapper">
      <form  className="RegistrationForm"action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="First Name" required />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Last Name" required />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};
export default Registration;
