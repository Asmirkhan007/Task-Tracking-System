// ProjectsTable.js
import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Added Assign User icon
import "./css/ProjectTable.css";

import AssignUsersModal from "../styled-components/AssignUserModal";

export default function ProjectsTable({ projects, onDelete }) {
  // State to manage the delete confirmation modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // State to manage the assign users modal
  const [assignUsersModalOpen, setAssignUsersModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
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
    console.log("proint")
    const project = projects.find((p) => p.id === projectId);

    // Set the selected users and project ID for assign users modal
    console.log(project);
    setSelectedUsers(project.selectedUsers || []);
    setSelectedProjectId(projectId);
    setAssignUsersModalOpen(true);
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

    const userData = JSON.parse(localStorage.getItem("userData")) || [];

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
        <div className="card-container">
          {projects.map((project) => (
            <Card key={project.id} className="project-card">
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography>Description: {project.description}</Typography>
                <Link to={`/project-details/${project.id}`}>View Details</Link>
              </CardContent>
              <div className="project-icons-container">
                <Link to={`/editproject/${project.id}`}>
                  <EditIcon color="primary" />
                </Link>
                <PersonAddIcon
                  className="assign-user"
                  onClick={() => openAssignUsersModal(project.id)}
                />
                <DeleteIcon
                  className="delete-data"
                  onClick={() => openDeleteModal(project.id)}
                />
              </div>
            </Card>
          ))}
        </div>
        {/* ... (remaining code) */}
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
