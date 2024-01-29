import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        alert("Username and password are required");
        return;
      }

      // Call the server's login endpoint
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response) {
        // Login successful, you can store the token in local storage or a state
        alert("Login successful");
        sessionStorage.setItem("isLoggedIn", "true");

      // Redirect to the home page or another route
        // Example: localStorage.setItem("token", data.token);
        navigate("/"); // Redirect to the dashboard or another page
      } else {
        // Login failed
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="   Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="   Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
          <div className="register-link">
            <Link to="/Reg">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;



// import React from "react";
// import "./LoginForm.css";
// import { Link } from "react-router-dom";
// const LoginForm = () => {
//   return (
//     <div className="login">
//       <div className="wrapper">
//         <form action="">
//           <h1>Login</h1>
//           <div className="input-box">
//             <input type="text" placeholder="   Username" required />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="   Password" required />
//           </div>
//           <div className="remember-forgot">
//             <label>
//               <input type="checkbox" />
//               Remember Me
//             </label>
//             <a href="#">Forgot password</a>
//           </div>

//           <button type="submit">Login</button>
//           <div className="register-link">
//             <Link to="/Reg">Register</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default LoginForm;
