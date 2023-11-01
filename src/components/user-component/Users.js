import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import "./css/Users.css";
import userArray from "./userArray";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userData")) || userArray; // Use the local storage data or the default array
    setUsers(userList);
  }, []);

  const editUser = (id, data) => {
    const updatedUsers = users.map((user) => (user.id === id ? data : user));
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  };

  const handleDelete = (id) => {
   
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("userData", JSON.stringify(updatedUsers));
    
  };

  return (
    <div className="App users-container">
      <h1>User Registration Form</h1>
      <Link to="/adduser">
        <button className="add-user-button">Add User</button>
      </Link>
      <UserTable users={users} onEdit={editUser} onDelete={handleDelete} />
    </div>
  );
}
