import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import "./Users.css";
import UserForm from "./UserForm";
import userArray from "./userArray";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userData")) || userArray; // Use the local storage data or the default array
    setUsers(userList);
  }, []);

  const addUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  };

  const editUser = (id, data) => {
    const updatedUsers = users.map((user, index) =>
      index === id ? data : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  };

  return (
    <div className="App users-container">
      <h1>User Registration Form</h1>
      <Link to="/adduser">
        <button className="add-user-button">Add User</button>
      </Link>
      <UserTable users={users} onEdit={editUser} />
    </div>
  );
}
