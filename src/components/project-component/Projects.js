import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectTable from "./ProjectTable";
import "./css/Projects.css";
import dummyProjects from "./projectArray";
import CustomNavbar from "../styled-components/Navbar";
import { v4 as uuidv4 } from "uuid";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  // Use useEffect to initialize project data from localStorage or dummy data
  useEffect(() => {
    const projectData = JSON.parse(localStorage.getItem("projectData"));

    if (projectData) {
      setProjects(projectData);
    } else {
      const projectsWithUUIDs = dummyProjects.map((project) => ({
        ...project,
        id: uuidv4(),
      }));

      localStorage.setItem("projectData", JSON.stringify(projectsWithUUIDs));
      console.log("Using Default Project Data:", projectsWithUUIDs);
      setProjects(projectsWithUUIDs);
    }
  }, []);

  // Function to edit a project
  const editProject = (id, data) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? data : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  // Function to handle project deletion
  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  return (
    <>
      <CustomNavbar />
      <br />
      <div className="App projects-container">
        <div className="header-container">
          <h1 className="projects-heading">Project List</h1>
          <Link to="/addproject">
            <button className="add-project-button">Add Project</button>
          </Link>
        </div>
        <ProjectTable
          projects={projects}
          onEdit={editProject}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
