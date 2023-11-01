import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "./css/UserTable.css";
import "./css/Modal.css";

export default function UserTable({ users, onEdit, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  return (
    <div className="table-container">
      <h2>User Data</h2>
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
          {users.map((user,index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.number}</td>
              <td>{user.experience}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/edituser/${user.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button onClick={() => openDeleteModal(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
