import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./components/user-component/Users";
import UserForm from "./components/user-component/UserForm";
import Home from "./components/home-component/HomePage";
import Projects from "./components/project-component/Projects";
import ProjectForm from "./components/project-component/ProjectForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/adduser" element={<UserForm />} />
      <Route path="/addproject" element={<ProjectForm />} />
      <Route path="/edituser/:id" element={<UserForm />} />
      <Route path="/editproject/:id" element={<ProjectForm />} />
    </Routes>
  );
}
