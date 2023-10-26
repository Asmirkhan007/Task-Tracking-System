import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import "./Users.css";
// import UserForm from "./UserForm";
// import userArray from "./userArray"; // Import userArray

export default function Users() {
  const [users, setUsers] = useState([]); // Initialize the user list with an empty array

  // Function to add a new user to the list and local storage
  // const addUser = (user) => {
  //   const updatedUsers = [...users, user];
  //   setUsers(updatedUsers);
  //   localStorage.setItem("userData", JSON.stringify(updatedUsers));
  // };

  useEffect(() => {
    // Retrieve user list from local storage on component mount
    const userList = JSON.parse(localStorage.getItem("userData"));
    if (userList) {
      setUsers(userList);
    }
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div className="App users-container">
      <h1>User Registration Form</h1>
      <Link to="/adduser">
        <button className="add-user-button">Add User</button>
      </Link>
      {/* <UserForm addUser={addUser} /> */}
      <UserTable users={users} />
    </div>
  );
}
