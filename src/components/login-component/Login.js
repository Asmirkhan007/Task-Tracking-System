import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dummyProjects from "../project-component/projectArray";
import userArray from "../user-component/userArray";
import { v4 as uuidv4 } from "uuid";
import "./Login.css";
import loginImage from "../../assets/login.avif";

const Login = ({ setUserIsLoggedIn }) => {
  // State to manage form data
  // console.log("ssw");
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    remember: false,
  });

  // State to manage error messages
  const [errorMessage, setErrorMessage] = React.useState("");

  // Get the navigation function from React Router
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract username and password from form data
    const { username, password } = formData;

    // Get user data from local storage
    const users = JSON.parse(localStorage.getItem("userData"));

    // Convert the username to lowercase for case-insensitive comparison
    const lowercaseUsername = username.toLowerCase();

    // Find the user with the provided username and matching password
    const foundUser = users.find(
      (user) =>
        (user.name.toLowerCase() === lowercaseUsername ||
          user.email.toLowerCase() === lowercaseUsername) &&
        user.password === password
    );

    if (foundUser) {
      // If a user is found, store it in local storage and navigate to the user's page
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/user/" + foundUser.id);
    } else if (
      // Check for an admin login
      (lowercaseUsername === "admin" ||
        lowercaseUsername === "admin@thirantech.com") &&
      password === "pass1234"
    ) {
      // Store the admin login status in local storage and update the user login status
      localStorage.setItem("isLoggedIn", true);
      setUserIsLoggedIn(true);
      navigate("/");
    } else {
      // If no matching user or admin login, show an error message
      setErrorMessage("Invalid username or password");
    }

    // Clear the password and remember flag in the form data
    setFormData({
      password: "",
      remember: false,
    });
  };

  // Use useEffect to initialize project data if it doesn't exist in local storage
  useEffect(() => {
    const projectData = JSON.parse(localStorage.getItem("projectData"));

    if (!projectData) {
      // If project data is missing, create default projects with UUIDs
      const projectsWithUUIDs = dummyProjects.map((project) => ({
        ...project,
        id: uuidv4(),
      }));

      // Store the default project data in local storage
      localStorage.setItem("projectData", JSON.stringify(projectsWithUUIDs));
      console.log("Using Default Project Data:", projectsWithUUIDs);
    }
  }, []);

  // Use useEffect to initialize user data if it doesn't exist in local storage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userData"));

    if (!storedUsers) {
      // If user data is missing, create default users with UUIDs
      const usersWithIds = userArray.map((user) => ({
        ...user,
        id: uuidv4(),
      }));

      // Store the default user data in local storage
      localStorage.setItem("userData", JSON.stringify(usersWithIds));
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={loginImage} alt="Login" />
        </div>
        <form name="login-form" onSubmit={handleSubmit} id="login-form">
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-item">
            <label htmlFor="username">Username or Email Id</label>
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
          <br />
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
