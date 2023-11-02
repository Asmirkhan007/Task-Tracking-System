import React, { useState } from "react";
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <th>Contact Number</th>
            <th>Years of Experience</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.number}</td>
              <td>{user.experience}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/edituser/${user.id}`}>
                  <Button>Edit</Button>
                </Link>
              </td>
              <td>
                <Button onClick={() => openDeleteModal(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
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
