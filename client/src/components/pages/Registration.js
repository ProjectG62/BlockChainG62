import React, { useState } from "react";
import "./Registration.css";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    // Assuming Google login was successful, redirect to the home page after 20 seconds
    setTimeout(() => {
      navigate("/");
    }, 20000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Assuming you have your server running on localhost:5000
    const apiUrl = "http://localhost:5000/api/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: "",
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, you can handle the success case here
        console.log("Registration successful:", data);
        alert("Registration successful");
        setRegistrationSuccess(true);

        // No need for immediate navigation here; it will be done after 20 seconds
      } else {
        // Registration failed, you can handle the error case here
        console.error("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register">
      <div className="wrapper">
        <form className="RegistrationForm" onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {registrationSuccess && (
            <div className="registration-success-message">
              Registration successful! Redirecting to the home page in 20
              seconds...
            </div>
          )}

          <button type="submit">Register</button>

          <br />
          <br />
          <div className="GoogleLogin">
            <GoogleLogin
              clientId="686062209071-0h1r5k1si29lvcmhnda56ktbiifhogqc.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
