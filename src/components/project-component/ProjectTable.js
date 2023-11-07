import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../styled-components/Modal";
import Button from "../styled-components/Button";
import Pagination from "../styled-components/Pagination";
import AssignUsersModal from "../styled-components/AssignUserModal";
import "./css/ProjectTable.css";

export default function ProjectTable({ projects, onEdit, onDelete }) {
  // State to manage the delete confirmation modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // State to manage the assign users modal
  const [assignUsersModalOpen, setAssignUsersModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // State to manage the current page of the table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Function to open the delete confirmation modal
  const openDeleteModal = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setSelectedProjectId(null);
    setOpenModal(false);
  };

  // Function to open the assign users modal
  const openAssignUsersModal = (projectId) => {
    // Find the project with the selected ID
    const project = projects.find((p) => p.id === projectId);

    // Set the selected users and project ID for assign users modal
    setSelectedUsers(project.selectedUsers || []);
    setSelectedProjectId(projectId);
    setAssignUsersModalOpen(true);

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Provide a message if no users are available
    if (userData.length === 0) {
      alert("Please note that no users are available. You can add new users.");
    }
  };

  // Function to close the assign users modal
  const closeAssignUsersModal = () => {
    setSelectedProjectId(null);
    setAssignUsersModalOpen(false);
  };

  // Function to handle the confirmation of user assignment to a project
  const handleAssignUsersConfirm = () => {
    // Update the projects with the selected users
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          selectedUsers: selectedUsers,
        };
      }
      return project;
    });

    // Save the updated project data to local storage
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));

    // Update user data with project assignments
    const updatedUserData = userData.map((user) => {
      if (selectedUsers.includes(user.id)) {
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

    // Save the updated user data to local storage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    // Close the assign users modal
    closeAssignUsersModal();
  };

  // Retrieve user data from local storage or provide an alert message
  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Use useEffect to restore the current page from localStorage
  useEffect(() => {
    const savedPage = localStorage.getItem("projectTableCurrentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  // Use useEffect to provide a message if no users are available
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    if (userData.length === 0) {
      alert(
        "Please note that only placeholder projects are present in the table. You can create new projects to proceed."
      );
    }
  }, []);

  // Calculate the index of the last and first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items to display on the current page
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes and update the current page in local storage
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("projectTableCurrentPage", pageNumber);
  };

  // Render a message if no projects are available
  if (projects.length === 0 || typeof projects === "undefined") {
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
