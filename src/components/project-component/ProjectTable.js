import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "./css/ProjectTable.css";
import "./css/Modal.css";

export default function ProjectTable({ projects, onEdit, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const openDeleteModal = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedProjectId(null);
    setOpenModal(false);
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || [];


  return (
    <div className="table-container">
      <h2>Project Data</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Priority</th>
            <th>Tech Stack</th>
            <th>Users</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.priority}</td>
              <td>{project.techStack}</td>
              <td>
                {project.selectedUsers ? (
                  project.selectedUsers.map((userId) => {
                    const user = userData.find((u) => u.id === userId);
                    return <div key={userId}>{user.name}</div>;
                  })
                ) : (
                  <div>Yet to be assigned</div>
                )}
              </td>
              <td>
                <Link to={`/editproject/${project.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button onClick={() => openDeleteModal(project.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={openModal}
        onClose={closeDeleteModal}
        onConfirm={() => {
          onDelete(selectedProjectId);
          closeDeleteModal();
        }}
      />
    </div>
  );
}
