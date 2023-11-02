import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectTable from "./ProjectTable";
import "./css/Projects.css";
import projectArray from "./projectArray";
import Button from "../styled-components/Button";

import CustomNavbar from "../styled-components/Navbar";

export default function Projects() {
  const [Projects, setProjects] = useState([]);

  useEffect(() => {
    const projectList =
      JSON.parse(localStorage.getItem("projectData")) || projectArray; // Use the local storage data or the default array
    setProjects(projectList);
  }, []);

  const editproject = (id, data) => {
    const updatedProjects = Projects.map((project) =>
      project.id === id ? data : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  const handleDelete = (id) => {
    const updatedProjects = Projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  return (
    <>
      <CustomNavbar />
      <div className="App projects-container">
        <br></br>
        <h1 className="projects-heading">Project List</h1>
        <div className="add-project-button-container">
          <Link to="/addproject">
            <Button className="add-project-button">Add Project</Button>
          </Link>
        </div>
        <ProjectTable
          projects={Projects}
          onEdit={editproject}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
