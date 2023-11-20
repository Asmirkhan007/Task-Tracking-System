import React from "react";
import SingleUserPage from "../presentation/SingleUserPage";

const SingleUserPageContainer = () => {
  // Retrieve the logged-in user and project data from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
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

  // Render the container component passing data to the presentation component
  return (
    <SingleUserPage
      loggedInUser={loggedInUser}
      userProjects={userProjects}
      projectData={projectData}
    />
  );
};

export default SingleUserPageContainer;
