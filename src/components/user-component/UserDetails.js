import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import profileImage from "../../assets/profile-photo.webp";
import CustomNavbar from "../styled-components/Navbar";
import noProjectsImage from '../../assets/no-project.avif'
import "./css/UserDetails.css";
import Button from "@mui/material/Button";

export default function UserDetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage based on the user ID
    const fetchUserDetails = () => {
      try {
        // Assuming user data is stored in localStorage under the key 'userData'
        const userDataFromStorage = JSON.parse(
          localStorage.getItem("userData")
        );
        const dummyProjects = JSON.parse(localStorage.getItem("projectData"));
        if (dummyProjects) {
          setProjectDetails(dummyProjects);
          console.log(projectDetails);
        }
        console.log(userDataFromStorage);
        if (userDataFromStorage) {
          // Find the user with the matching ID
          const user = userDataFromStorage.find((user) => user.id === id);
          console.log(user);
          if (user) {
            setUserDetails(user);
          } else {
            // Handle case where user with the specified ID is not found
            console.error("User not found");
          }
        } else {
          // Handle case where user data is not available in local storage
          console.error("User data not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    // Render loading state or handle no user details
    return <p>Loading...</p>;
  }
  console.log(userDetails.project)
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
            <br/>
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
}
