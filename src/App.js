import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/user-component/Users";
import UserForm from "./components/user-component/UserForm";
import Home from "./components/home-component/HomePage";
import Projects from "./components/project-component/Projects";
import ProjectForm from "./components/project-component/ProjectForm";
import Login from "./components/login-component/Login";
import MainPage from "./components/display-component/MainPage";
import SingleUserPage from "./components/display-component/SingleUserPage";

function App() {
  //const userCheck = localStorage.getItem("isLoggedIn") === "true";
  const currLogIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(currLogIn);

  const userCheck = userIsLoggedIn === "adminIsTrue";
  useEffect(() => {
    getIsLoggedIn();
    console.log(userCheck)
  }, [])
  
  const getIsLoggedIn=()=>{
   
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && (isLoggedIn!=="undefined")) {
      let temp=JSON.parse(isLoggedIn);
      setUserIsLoggedIn(temp);
    } else {
      localStorage.setItem("isLoggedIn", JSON.stringify("adminIsFalse"));
      setUserIsLoggedIn("adminIsFalse");
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={userCheck ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/single"
        element={userCheck ? <MainPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/users"
        element={userCheck ? <Users /> : <Navigate to="/login" />}
      />
      <Route
        path="/projects"
        element={userCheck ? <Projects /> : <Navigate to="/login" />}
      />
      <Route
        path="/adduser"
        element={userCheck ? <UserForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/addproject"
        element={userCheck ? <ProjectForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/edituser/:id"
        element={userCheck ? <UserForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/:id"
        element={ <SingleUserPage /> }
      />
      <Route
        path="/editproject/:id"
        element={userCheck ? <ProjectForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={
         
            <Login setUserIsLoggedIn={setUserIsLoggedIn} />
    
        }
      />
    </Routes>
  );
}

export default App;
