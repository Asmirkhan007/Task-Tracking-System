import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectTable from "./ProjectTable";
import "./css/Projects.css";
import dummyProjects from "./projectArray"; // Assuming dummyProjects is a default array for initialization
import CustomNavbar from "../styled-components/Navbar";
import { v4 as uuidv4 } from "uuid";

export default function Projects() {
  const [Projects, setProjects] = useState([]); // State for storing project data

  // Load project data from local storage or use the default array (dummyProjects) when the component mounts
useEffect(() => {
  const projectData = JSON.parse(localStorage.getItem("projectData"));

  if (projectData) {
    setProjects(projectData);
  } else {
    // If no data is found in local storage, set the default data and generate a UUID for the id field.
    const projectsWithUUIDs = dummyProjects.map((project) => ({
      ...project,
      id: uuidv4(), // Generate a unique UUID for each project
    }));

    localStorage.setItem("projectData", JSON.stringify(projectsWithUUIDs));
    console.log("Using Default Project Data:", projectsWithUUIDs);
    setProjects(projectsWithUUIDs); // Set the default data to state
  }
}, []);


  // Function to edit a project
  const editproject = (id, data) => {
    // Map through projects and update the one with the matching ID
    const updatedProjects = Projects.map((project) =>
      project.id === id ? data : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects)); // Update local storage
  };

  // Function to delete a project
  const handleDelete = (id) => {
    // Filter out the project with the specified ID
    const updatedProjects = Projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects)); // Update local storage
  };

  return (
    <>
      {/* Custom Navbar component */}
      <CustomNavbar />
      <br />
      <div className="App projects-container">
        <div className="header-container">
          <h1 className="projects-heading">Project List</h1>
          {/* Link to the "Add Project" page */}
          <Link to="/addproject">
            <button className="add-project-button">Add Project</button>
          </Link>
        </div>
        {/* ProjectTable component to display the list of projects */}
        <ProjectTable
          projects={Projects}
          onEdit={editproject}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
