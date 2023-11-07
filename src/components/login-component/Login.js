import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import dummyProjects from "../project-component/projectArray"
import userArray from "../user-component/userArray";
import { v4 as uuidv4 } from "uuid";
import "./Login.css";
import login from "../../assets/login.avif"

const Login = ({ setUserIsLoggedIn }) => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errorMessage, setErrorMessage] = React.useState(""); // State for error message

  const navigate = useNavigate();
  //  localStorage.setItem("isLoggedIn", false);
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
   const users = JSON.parse(localStorage.getItem("userData"));

   // Convert the input values to lowercase
   const lowercaseUsername = username.toLowerCase();

   const foundUser = users.find(
     (user) =>
       (user.name.toLowerCase() === lowercaseUsername ||
         user.email.toLowerCase() === lowercaseUsername) &&
       user.password === password
   );
   console.log("Found User:", foundUser);

   if (foundUser) {
     // Successful login
     localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
     navigate("/user/" + foundUser.id); // Redirect to the user's profile page
   }
   // Check if the entered credentials match the admin credentials
   else if (
     (lowercaseUsername === "admin" ||
       lowercaseUsername === "admin@thirantech.com") &&
     password === "pass1234"
   ) {
     // Successful login
     localStorage.setItem("isLoggedIn", JSON.stringify("adminIsTrue")); // Store login status in localStorage
     setUserIsLoggedIn("adminIsTrue");

     navigate("/"); // Redirect to the home page or any other authorized route
   } else {
     // Failed login
     setErrorMessage("Invalid username or password");
   }
   // Clear the form fields
   setFormData({
     password: "",
     remember: false,
   });
 };


  useEffect(() => {
    const projectData = JSON.parse(localStorage.getItem("projectData"));

    if (projectData) {
    } else {
      // If no data is found in local storage, set the default data and generate a UUID for the id field.
      const projectsWithUUIDs = dummyProjects.map((project) => ({
        ...project,
        id: uuidv4(), // Generate a unique UUID for each project
      }));

      localStorage.setItem("projectData", JSON.stringify(projectsWithUUIDs));
      console.log("Using Default Project Data:", projectsWithUUIDs);
    }
  }, []);
   useEffect(() => {
     const storedUsers = JSON.parse(localStorage.getItem("userData"));

     if (storedUsers) {
       
     } else {
       // If user data doesn't exist in local storage, add unique IDs to userArray and store it
       const usersWithIds = userArray.map((user) => ({
         ...user,
         id: uuidv4(), // Generate a unique ID for each user
       }));

       // Store the updated data with IDs in local storage
       localStorage.setItem("userData", JSON.stringify(usersWithIds));
     }
   }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src = {login}
            alt= "Login"
          />
        </div>
        <form name="login-form" onSubmit={handleSubmit} id="login-form">
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div> // Display error message
          )}
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
        
          <br/>
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
