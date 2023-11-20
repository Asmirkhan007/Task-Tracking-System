import React from "react";
import "../SingleUserPage.css";
import profileImage from "../../../assets/profile-photo.webp";
import CustomNavbar from "../../styled-components/Navbar";
import noProjectsImage from "../../../assets/no-project.avif";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const SingleUserPage = ({ loggedInUser, userProjects, projectData }) => {
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
            <h2> {loggedInUser.name}</h2>
            <br />
          </div>
          <div className="profile-info">
            <p>Role: {loggedInUser.role}</p>
            <p>Email: {loggedInUser.email}</p>
            <p>Number: {loggedInUser.number}</p>
            <p>Experience: {loggedInUser.experience}</p>
            <p>Gender: {loggedInUser.gender}</p>
            {/* Display other user details as needed */}
          </div>
        </div>
        <div className="projects-container">
          <div className="projects-scrollable">
            <h2>Assigned Projects</h2>
            <br />
            {userProjects.length > 0 && userProjects !== "undefined" ? (
              userProjects.map((projectId) => {
                const project = projectData.find(
                  (proj) => proj.id === projectId.id
                );
                console.log(projectId.id);
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

export default SingleUserPage;
