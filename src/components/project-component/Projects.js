import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectTable from "./ProjectTable";
import "./css/Projects.css";
import projectArray from "./projectArray";

export default function Projects() {
  const [Projects, setProjects] = useState([]);
  console.log(Projects);
  useEffect(() => {
    const projectList = JSON.parse(localStorage.getItem("projectData")) || projectArray; // Use the local storage data or the default array
    setProjects(projectList);
  }, []);

  const editproject = (id, data) => {
    const updatedProjects = Projects.map((project) => (project.id === id ? data : project));
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  const handleDelete = (id) => {
   
      const updatedProjects = Projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem("projectData", JSON.stringify(updatedProjects));
    
  };

  return (
    <div className="App Projects-container">
      <h1>Project List</h1>
      <Link to="/addproject">
        <button className="add-project-button">Add project</button>
      </Link>

      <ProjectTable projects={Projects} onEdit={editproject} onDelete={handleDelete} />
    </div>
  );
}
