import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./components/user-component/Users";
import UserForm from "./components/user-component/UserForm";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/adduser" element={<UserForm />} />
    </Routes>
  );
}
