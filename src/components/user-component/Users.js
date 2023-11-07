import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import "./css/Users.css";
import userArray from "./userArray";
import CustomNavbar from "../styled-components/Navbar";
import { v4 as uuidv4 } from "uuid";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userData"));

    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      // Set default data if no data is found in local storage
      const usersWithIds = userArray.map((user) => ({
        ...user,
        id: uuidv4(),
      }));
      setUsers(usersWithIds);
      localStorage.setItem("userData", JSON.stringify(usersWithIds));
    }

    setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <>
      <CustomNavbar />
      <br />
      <div className="App users-container">
        <header className="header-container">
          <h2 className="users-heading">User Details</h2>
          <Link to="/adduser">
            <button className="add-user-button">Add User</button>
          </Link>
        </header>
        <UserTable users={users} onEdit={editUser} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default Users;
