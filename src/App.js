import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/user-component/Users";
import UserForm from "./components/user-component/UserForm";
import Home from "./components/home-component/HomePage";
import Projects from "./components/project-component/Projects";
import ProjectForm from "./components/project-component/ProjectForm";
import Login from "./components/login-component/Login";
import SingleUserPage from "./components/display-component/SingleUserPage";

function App() {
  // State to manage user login status
   const currentLogInStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(currentLogInStatus);

  // Function to retrieve user login status from local storage
  const getIsLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && isLoggedIn !== "undefined") {
      const temp = JSON.parse(isLoggedIn);
      setUserIsLoggedIn(temp);
    } else {
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      setUserIsLoggedIn(false);
    }
  };

  // Use useEffect to initialize user login status
  useEffect(() => {
    getIsLoggedIn();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        // Render the Home component if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        // Render the Users component if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <Users /> : <Navigate to="/login" />}
      />
      <Route
        path="/projects"
        // Render the Projects component if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <Projects /> : <Navigate to="/login" />}
      />
      <Route
        path="/adduser"
        // Render the UserForm component to add a new user if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <UserForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/addproject"
        // Render the ProjectForm component to add a new project if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <ProjectForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/edituser/:id"
        // Render the UserForm component to edit a user if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <UserForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/:id"
        // Render the SingleUserPage component to display a single user's information
        element={<SingleUserPage />}
      />
      <Route
        path="/editproject/:id"
        // Render the ProjectForm component to edit a project if the user is logged in; otherwise, navigate to the login page
        element={userIsLoggedIn ? <ProjectForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        // Render the Login component and pass the setUserIsLoggedIn function to handle login status
        element={<Login setUserIsLoggedIn={setUserIsLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
