import React from "react";
import { Link } from "react-router-dom";
import ProjectTable from "./ProjectTable";
import "../css/Projects.css";
import CustomNavbar from "../../styled-components/Navbar";

const Projects = ({ projects, onEdit, onDelete }) => {
 

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
        <ProjectTable projects={projects} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </>
  );
};

export default Projects;
