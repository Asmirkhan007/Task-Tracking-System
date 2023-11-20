import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AssignUsersModal from "../../styled-components/AssignUserModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../css/ProjectTable.css";

const ProjectsTable = ({ projects, onDelete, onEdit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [assignUsersModalOpen, setAssignUsersModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const openDeleteModal = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedProjectId(null);
    setOpenModal(false);
  };

  const openAssignUsersModal = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedUsers(project.selectedUsers || []);
    setSelectedProjectId(projectId);
    setAssignUsersModalOpen(true);
  };

  const closeAssignUsersModal = () => {
    setSelectedProjectId(null);
    setAssignUsersModalOpen(false);
  };

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

    localStorage.setItem("projectData", JSON.stringify(updatedProjects));

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
      } else {
        const userProjects = user.projects || [];
        const projectIndex = userProjects.indexOf(selectedProjectId);
        if (projectIndex !== -1) {
          userProjects.splice(projectIndex, 1);
        }
        return {
          ...user,
          projects: userProjects,
        };
      }
    });

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    console.log("Updated userData", updatedUserData);

    // Show a Snackbar notification
    setSnackbarOpen(true);

    closeAssignUsersModal();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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
                <Link to={`/project-details/${project.id}`}>
                  <Button variant="outlined" color="primary">
                    View more details
                  </Button>
                </Link>
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
      </div>
      <AssignUsersModal
        open={assignUsersModalOpen}
        onClose={closeAssignUsersModal}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        onConfirm={handleAssignUsersConfirm}
        userData={userData}
      />
      <Modal open={openModal} onClose={closeDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Delete Confirmation</Typography>
          <Typography>Are you sure you want to delete this project?</Typography>
          <Button
            variant="contained"
            onClick={() => onDelete(selectedProjectId)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={closeDeleteModal}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success">
          User added successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ProjectsTable;
