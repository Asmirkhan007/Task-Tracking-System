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
    getUserData();
  }, []);

  const getUserData = () => {
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
  };

  const editUser = (id, data) => {
    const updatedUsers = users.map((user) => (user.id === id ? data : user));
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  };

  const handleDelete = (id) => {
    // Update projects in local storage to remove the user from selectedUsers
    const projectData = JSON.parse(localStorage.getItem("projectData")) || [];

    const updatedProjectData = projectData.map((project) => ({
      ...project,
      selectedUsers: project.selectedUsers.filter((userId) => userId !== id),
    }));

    localStorage.setItem("projectData", JSON.stringify(updatedProjectData));
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
     
      <div className="App users-container">
        <div className="header-container">
          <h1 className="users-heading">User Details</h1>
          <Link to="/adduser">
            <button className="add-user-button">Add User</button>
          </Link>
        </div>
        <br/>
          <UserTable users={users} onEdit={editUser} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default Users;
