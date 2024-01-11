import React from "react";
import "./LoginForm.css";
const LoginForm = () => {
  return (
    <div className="login">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="   Username" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="   Password" required />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot password</a>
          </div>

          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?<a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
