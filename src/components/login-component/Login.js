import React from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errorMessage, setErrorMessage] = React.useState(""); // State for error message

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
 
  const { username, password } = formData;

  // Check if the entered credentials match the admin credentials
  if (username === "Admin" && password === "pass1234") {
    // Successful login
    localStorage.setItem("isLoggedIn", "true"); // Store login status in localStorage
    navigate("/"); // Redirect to the home page or any other authorized route
  } else {
    // Failed login
    setErrorMessage("Invalid username or password");
  }
 };


  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <form name="login-form" onSubmit={handleSubmit} id="login-form">
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div> // Display error message
          )}
          <div className="form-item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="remember">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={formData.remember}
                onChange={handleInputChange}
              />
              Remember me
            </label>
          </div>
          <div className="form-item">
            <button type="submit" className="login-form-button">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
