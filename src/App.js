import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/user-component/presentation/Users";
import UserForm from "./components/user-component/presentation/UserForm";
import Home from "./components/home-component/presentation/HomePage";
import Projects from "./components/project-component/container/ProjectsContainer";
import ProjectForm from "./components/project-component/presentation/ProjectForm";
import Login from "./components/login-component/container/LoginContainer";
import SingleUserPage from "./components/display-component/container/SingleUserPageContainer";
import UserDetails from "./components/user-component/container/UserDetailsContainer";
import ProjectDetails from "./components/project-component/presentation/ProjectDetails";

function App() {
  // State to manage user login status
  const currentLogInStatus =
    JSON.parse(localStorage.getItem("isLoggedIn")) === true;
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(currentLogInStatus);

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
        path="/user-details/:id"
        // Render the SingleUserPage component to display a single user's information
        element={<UserDetails />}
      />
      <Route
        path="/project-details/:id"
        // Render the SingleUserPage component to display a single user's information
        element={<ProjectDetails />}
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
