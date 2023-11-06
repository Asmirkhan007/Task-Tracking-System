import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/user-component/Users";
import UserForm from "./components/user-component/UserForm";
import Home from "./components/home-component/HomePage";
import Projects from "./components/project-component/Projects";
import ProjectForm from "./components/project-component/ProjectForm";
import Login from "./components/login-component/Login";

function App() {
  const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      <Route
        path="/"
        element={userIsLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={userIsLoggedIn ? <Users /> : <Navigate to="/login" />}
      />
      <Route
        path="/projects"
        element={userIsLoggedIn ? <Projects /> : <Navigate to="/login" />}
      />
      <Route
        path="/adduser"
        element={userIsLoggedIn ? <UserForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/addproject"
        element={userIsLoggedIn ? <ProjectForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/edituser/:id"
        element={userIsLoggedIn ? <UserForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/editproject/:id"
        element={userIsLoggedIn ? <ProjectForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={userIsLoggedIn ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}

export default App;
