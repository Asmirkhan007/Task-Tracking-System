import React from "react";
import "./SingleUserPage.css";
import Logout from "../login-component/Logout";

export default function SingleUserPage() {
  // Retrieve the logged-in user and project data from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const projectData = JSON.parse(localStorage.getItem("projectData")) || [];

  // Function to filter and get project details based on the user's assigned project IDs
  const getUserProjects = () => {
    if (loggedInUser && loggedInUser.projects) {
      return projectData.filter((project) =>
        loggedInUser.projects.includes(project.id)
      );
    }
    return [];
  };

  // Call the function to get user's assigned projects
  const userProjects = getUserProjects();

  // Render the user profile and assigned projects
  return (
    <div>
      <div className="container">
        <h1 className="heading">User Profile Page</h1>
        <Logout />
      </div>

      {loggedInUser ? (
        <div className="single-user-container">
          <h1 className="user-name">{loggedInUser.name}</h1>
          <p className="user-email">{loggedInUser.email}</p>
          <p className="user-role">{loggedInUser.role}</p>
          <p className="user-contact">Contact: {loggedInUser.number}</p>
          <p className="user-experience">
            Years of Experience: {loggedInUser.experience}
          </p>
          <p className="user-gender">Gender: {loggedInUser.gender}</p>
          {userProjects.length > 0 ? (
            <>
              <h2>Assigned Projects:</h2>
              <ul>
                {userProjects.map((project) => (
                  <li key={project.id}>
                    <strong>Project Name:</strong> {project.name}
                    <br />
                    <strong>Description:</strong> {project.description}
                    <br />
                    <strong>Start Date:</strong> {project.startDate}
                    <br />
                    <strong>End Date:</strong> {project.endDate}
                    <br />
                    <strong>Priority:</strong> {project.priority}
                    <br />
                    <strong>Tech Stack:</strong> {project.techStack}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="project-info">Project yet to be assigned</p>
          )}
        </div>
      ) : (
        <p className="project-info">No user data available. Please log in.</p>
      )}
    </div>
  );
}
