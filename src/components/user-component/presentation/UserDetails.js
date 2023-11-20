import React from "react";
import { Link } from "react-router-dom";
import profileImage from "../../../assets/profile-photo.webp";
import CustomNavbar from "../../styled-components/Navbar";
import noProjectsImage from "../../../assets/no-project.avif";
import Button from "@mui/material/Button";
import "../css/UserDetails.css";

const UserDetailsPresentation = ({ userDetails, projectDetails }) => {
  const userProjects = userDetails.projects || [];

  return (
    <>
      <CustomNavbar />
      <div className="details-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={profileImage}
              alt="ProfileIcon"
              className="profile-photo"
            />
            <h2> {userDetails.name}</h2>
            <br />
          </div>
          <div className="profile-info">
            <p>Role: {userDetails.role}</p>
            <p>Email: {userDetails.email}</p>
            <p>Number: {userDetails.number}</p>
            <p>Experience: {userDetails.experience}</p>
            <p>Gender: {userDetails.gender}</p>
            {/* Display other user details as needed */}
          </div>
        </div>
        <div className="projects-container">
          <div className="projects-scrollable">
            <h2>Assigned Projects</h2>
            <br />
            {userProjects.length > 0 && userProjects !== "undefined" ? (
              userProjects.map((projectId) => {
                const project = projectDetails.find(
                  (proj) => proj.id === projectId
                );
                return (
                  project && (
                    <div className="project-card" key={project.id}>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <Link to={`/project-details/${project.id}`}>
                        <Button variant="outlined" color="primary">
                          View more details
                        </Button>
                      </Link>
                    </div>
                  )
                );
              })
            ) : (
              <div className="no-projects">
                <img
                  src={noProjectsImage}
                  alt="No projects assigned"
                  className="no-projects-image"
                />
                <p>No projects assigned yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPresentation;
