import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../styled-components/Modal";
import Button from "../styled-components/Button";
import Pagination from "../styled-components/Pagination"; // Import the Pagination component
import AssignUsersModal from "../styled-components/AssignUserModal";
import './css/ProjectTable.css'

export default function ProjectTable({ projects, onEdit, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [assignUsersModalOpen, setAssignUsersModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Open the delete modal
  const openDeleteModal = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setSelectedProjectId(null);
    setOpenModal(false);
  };

  // Open the assign users modal
  const openAssignUsersModal = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedUsers(project.selectedUsers || []);
    setSelectedProjectId(projectId);
    setAssignUsersModalOpen(true);

    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    if (userData.length === 0) {
      // Display a message if there are no users
      alert(
        "Please note that no users are available. You can add new users."
      );
    }
  };

  // Close the assign users modal
  const closeAssignUsersModal = () => {
    setSelectedProjectId(null);
    setAssignUsersModalOpen(false);
  };

  // Handle the confirmation of assigning users
  const handleAssignUsersConfirm = () => {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          selectedUsers: selectedUsers,
        };
      }
      return project;
    });

    // Update local storage or your data management logic here
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));

    // Set the project ID in the userData for the selected users
    const updatedUserData = userData.map((user) => {
      if (selectedUsers.includes(user.id)) {
        // Add the project ID to the user's projects array
        const userProjects = user.projects || [];
        if (!userProjects.includes(selectedProjectId)) {
          userProjects.push(selectedProjectId);
        }
        return {
          ...user,
          projects: userProjects,
        };
      }
      return user;
    });

    // Update the userData in local storage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    closeAssignUsersModal();

    setSelectedUsers(selectedUsers);
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Load the saved page from local storage if available
  useEffect(() => {
    const savedPage = localStorage.getItem("projectTableCurrentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  // Display an alert if there are no users
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    if (userData.length === 0) {
      alert(
        "Please note that only placeholder projects are present in the table. You can create new projects to proceed."
      );
    }
  }, []);

  // Calculate the index of the last and first item for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("projectTableCurrentPage", pageNumber);
  };
  console.log(currentItems.length)
  if (projects.length === 0 || projects === 'undefined') {
    return (
      <div className="table-container">
        <p>No projects found. You can create new projects to proceed.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Priority</th>
              <th>Tech Stack</th>
              <th>Users</th>
              <th>Actions</th>
              <th className="assign-users-col">Assign Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => {
              const serialNumber = index + 1 + (currentPage - 1) * itemsPerPage;
              console.log("user", userData)
              return (
                <tr key={project.id}>
                  <td>{serialNumber}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.priority}</td>
                  <td>{project.techStack}</td>
                  <td>
                    {project.selectedUsers.length > 0 && userData.length > 0 ? (
                      project.selectedUsers.map((userId) => {
                        const user = userData.find((u) => u.id === userId);
                        if (user) return <div key={userId}>{user.name}</div>;
                        else {
                          return (
                            <div className="user-info">Yet to be assigned</div>
                          );
                        }
                      })
                    ) : (
                      <div className="user-info">Yet to be assigned</div>
                    )}
                  </td>
                  <td>
                    <Link to={`/editproject/${project.id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </td>
                  <td className="assign-users-col">
                    <button
                      className="assign-user"
                      onClick={() => openAssignUsersModal(project.id)}
                    >
                      Add Users
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-data"
                      onClick={() => openDeleteModal(project.id)}
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
            onDelete(selectedProjectId);
            closeDeleteModal();
          }}
        />
      </div>
      <AssignUsersModal
        open={assignUsersModalOpen}
        onClose={closeAssignUsersModal}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        onConfirm={handleAssignUsersConfirm}
        userData={userData}
      />
    </>
  );
}
