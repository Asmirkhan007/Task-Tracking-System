import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import userArray from "./userArray";
import "./Users.css"; // Import the CSS file

export default function Users() {
  const [users, setUsers] = useState(userArray);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className="App users-container">
      {" "}
      {/* Apply the "users-container" class */}
      <h1>User Registration Form</h1>
      <Link to="/adduser">
        <button className="add-user-button">Add User</button>{" "}
        {/* Apply the "add-user-button" class */}
      </Link>
      <UserTable users={users} />
    </div>
  );
}
