import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import "./css/Users.css";
import userArray from "./userArray";
import CustomNavbar from "../styled-components/Navbar";
import { v4 as uuidv4 } from "uuid";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUsers = JSON.parse(localStorage.getItem("userData"));

    if (storedUsers) {
      // If user data exists, use it
      setUsers(storedUsers);
    } else {
      // If user data doesn't exist in local storage, add unique IDs to userArray and store it
      const usersWithIds = userArray.map((user) => ({
        ...user,
        id: uuidv4(), // Generate a unique ID for each user
      }));

      setUsers(usersWithIds);

      // Store the updated data with IDs in local storage
      localStorage.setItem("userData", JSON.stringify(usersWithIds));
    }
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
    <>
      <CustomNavbar />
      <br />
      <div className="App users-container">
        <div className="header-container">
          <h2 className="users-heading">User Details</h2>
          <Link to="/adduser">
            <button className="add-user-button">Add User</button>
          </Link>
        </div>
        <UserTable users={users} onEdit={editUser} onDelete={handleDelete} />
      </div>
    </>
  );
}
