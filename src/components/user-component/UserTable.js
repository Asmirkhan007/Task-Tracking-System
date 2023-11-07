import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../styled-components/Modal";
import "./css/UserTable.css";
import "./css/Modal.css";
import Button from "../styled-components/Button";
import Pagination from "../styled-components/Pagination";

export default function UserTable({ users, onEdit, onDelete }) {
  // State to manage the delete confirmation modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // State to manage the current page of the table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Function to open the delete confirmation modal
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calculate the index of the last and first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items to display on the current page
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // Use effect to retrieve the current page from local storage
  useEffect(() => {
    const savedPage = localStorage.getItem("userTableCurrentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  // Function to handle page changes and update the current page in local storage
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
                    <span className="user-info">Yet to be assigned</span>
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
                  <button
                    className="delete-data"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    Delete
                  </button>
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
