// ProjectDetails.js

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/ProjectDetails.css";
import projectImage from "../../../assets/project-icon-img.jpg";
import noUser from "../../../assets/no-user.webp";
import CustomNavbar from "../../styled-components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import AssignUsersModal from "../../styled-components/AssignUserModal";
import Button from "@mui/material/Button";

export default function ProjectDetails() {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [assignUsersModalOpen, setAssignUsersModalOpen] = useState(false);
  const adminLogIn = JSON.parse(localStorage.getItem("isLoggedIn")) === true;
  useEffect(() => {
    // Fetch project details from local storage based on the project ID
    const fetchProjectDetails = () => {
      try {
        // Assuming project data is stored in localStorage under the key 'projectData'
        const projectDataFromStorage = JSON.parse(
          localStorage.getItem("projectData")
        );
        const users = JSON.parse(localStorage.getItem("userData"));
        if (users) {
          setUserDetails(users);
        }

        if (projectDataFromStorage) {
          // Find the project with the matching ID
          const project = projectDataFromStorage.find(
            (project) => project.id === id
          );

          if (project) {
            setProjectDetails(project);
          } else {
            // Handle case where project with the specified ID is not found
            console.error("Project not found");
          }
        } else {
          // Handle case where project data is not available in local storage
          console.error("Project data not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching project details", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!projectDetails) {
    // Render loading state or handle no project details
    return <p>Loading...</p>;
  }

  return (
    <>
      <CustomNavbar />
      <div className="details-container">
        <div className="details-card">
          <div className="details-header">
            <img
              src={projectImage}
              alt="ProjectIcon"
              className="project-photo"
            />
            <div className="header-content">
              <h2>{projectDetails.name}</h2>
              {adminLogIn ? (
                <Link to={`/editproject/${id}`}>
                  <EditIcon color="primary" className="EditIcon" />
                </Link>
              ) : null}
            </div>
          </div>
          <div className="details-info">
            <p>Description: {projectDetails.description}</p>
            <p>Start Date: {projectDetails.startDate}</p>
            <p>End Date: {projectDetails.endDate}</p>
            <p>Priority: {projectDetails.priority}</p>
            <p>Tech Stack: {projectDetails.techStack}</p>
          </div>
        </div>
        <div className="users-container">
          <h2>Assigned Users</h2>
          <div className="users-scrollable">
            {projectDetails.selectedUsers.length > 0 ? (
              projectDetails.selectedUsers.map((userId) => {
                const user = userDetails.find((user) => user.id === userId);
                return (
                  <div className="user-card" key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.role}</p>
                    {adminLogIn ? (
                      <Link to={`/user-details/${user.id}`}>
                        <Button variant="outlined" color="primary">
                          View more details
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <div className="no-projects">
                <img
                  src={noUser}
                  alt="No users assigned"
                  className="no-projects-image"
                />
                <p>No users assigned yet.</p>
                <Link to={`/editproject/${id}`}>
                  <button>Add User</button>
                </Link>
                {/* <button
                  className="assign-user-button"
                  onClick={handleAssignUsersClick}
                >
                  Assign User
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <AssignUsersModal
        open={assignUsersModalOpen}
        onClose={() => setAssignUsersModalOpen(false)}
        // Add any necessary props for the modal
      />
    </>
  );
}
