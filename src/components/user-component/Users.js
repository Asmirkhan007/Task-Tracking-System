import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import "./css/Users.css";
import userArray from "./userArray";
import Button from "../styled-components/Button";
import CustomNavbar from "../styled-components/Navbar";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userData")) || userArray;
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
    <>
      <CustomNavbar />
      <br/>
      <div className="App users-container">
        <div className="header-container">
          <h2 className="users-heading">User Details</h2>
          <Link to="/adduser">
            <Button className="add-user-button">Add User</Button>
          </Link>
        </div>
        <UserTable users={users} onEdit={editUser} onDelete={handleDelete} />
      </div>
    </>
  );
}
