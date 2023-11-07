import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../styled-components/Modal";
import "./css/UserTable.css";
import "./css/Modal.css";
import Button from "../styled-components/Button";
import Pagination from "../styled-components/Pagination";

export default function UserTable({ users, onEdit, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const savedPage = localStorage.getItem("userTableCurrentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);
   useEffect(() => {
     const userData = JSON.parse(localStorage.getItem("userData")) || [];
     if (userData.length === 0) {
       alert(
         "Please note that only placeholder users are present in the table. You can create new users to proceed."
       );
     }
   }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("userTableCurrentPage", pageNumber);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Project</th>
            <th>Contact Number</th>
            <th>Years of Experience</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => {
            const serialNumber = index + 1 + (currentPage - 1) * itemsPerPage;

            // Check local storage for project details
            const projectData =
              JSON.parse(localStorage.getItem("projectData")) || [];

            // Find the project assigned to the user, if any
           const assignedProjects = projectData.filter((project) =>
             project.selectedUsers.includes(user.id)
           );

            // const assignDetails = assignedProject.map((p) => (p.name));
            // console.log(assignDetails)
            return (
              <tr key={user.id}>
                <td>{serialNumber}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {assignedProjects.length > 0 ? (
                    <ul>
                      {assignedProjects.map((project) => (
                        <li key={project.id}>{project.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span style={{ color: "red" }}>Yet to be assigned</span>
                  )}
                </td>
                <td>{user.number}</td>
                <td>{user.experience}</td>
                <td>{user.gender}</td>
                <td>
                  <Link to={`/edituser/${user.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </td>
                <td>
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => openDeleteModal(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        open={openModal}
        onClose={closeDeleteModal}
        onConfirm={() => {
          onDelete(selectedUserId);
          closeDeleteModal();
        }}
      />
    </div>
  );
}
