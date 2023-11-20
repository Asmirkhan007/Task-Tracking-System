import React, { useState, useEffect } from "react";
import Projects from "../presentation/Projects";
import dummyProjects from "../projectArray";
import { v4 as uuidv4 } from "uuid";

const ProjectsContainer = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjectData();
  }, []);

  const getProjectData = () => {
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
  };

  const editProject = (id, data) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? data : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));
  };

  return (
    <Projects
      projects={projects}
      onEdit={editProject}
      onDelete={handleDelete}
    />
  );
};

export default ProjectsContainer;
