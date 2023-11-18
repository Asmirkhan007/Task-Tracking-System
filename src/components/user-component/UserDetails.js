import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profileImage from "../../assets/profile-photo.webp";
import CustomNavbar from "../styled-components/Navbar";
import "./css/UserDetails.css";

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

  return (
    <>
      <CustomNavbar />
      <div className="user-details-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={profileImage}
              alt="ProfileIcon"
              className="profile-photo"
            />
            <h2>User Details</h2>
          </div>
          <div className="profile-info">
            <p>Name: {userDetails.name}</p>
            <p>Role: {userDetails.role}</p>
            <p>Email: {userDetails.email}</p>
            <p>Number: {userDetails.number}</p>
             <p>Experience: {userDetails.experience}</p>
            <p>Gender: {userDetails.gender}</p>
            {/* Display other user details as needed */}
          </div>
        </div>
        <div className="projects-container">
          <h2>Assigned Projects</h2>
          <div className="projects-scrollable">
            {userDetails.projects.map((projectId) => {
              const project = projectDetails.find(
                (proj) => proj.id === projectId
              );
              return (
                <div className="project-card" key={project.id}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {/* Add more project details as needed */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
