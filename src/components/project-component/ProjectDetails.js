// ProjectDetails.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch project details from local storage based on the project ID
    const fetchProjectDetails = () => {
      try {
        // Assuming project data is stored in localStorage under the key 'projectData'
        const projectDataFromStorage = JSON.parse(
          localStorage.getItem("projectData")
        );

        if (projectDataFromStorage) {
          // Find the project with the matching ID
          const project = projectDataFromStorage.find(
            (project) => project.id === id
          );

          if (project) {
            setProjectDetails(project);
          } else {
            // Handle case where project with the specified ID is not found
            console.error("Project not found");
          }
        } else {
          // Handle case where project data is not available in local storage
          console.error("Project data not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching project details", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!projectDetails) {
    // Render loading state or handle no project details
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-header">
          <h2>Project Details</h2>
        </div>
        <div className="details-info">
          <p>Name: {projectDetails.name}</p>
          <p>Description: {projectDetails.description}</p>
          <p>Start Date: {projectDetails.startDate}</p>
          <p>End Date: {projectDetails.endDate}</p>
          <p>Priority: {projectDetails.priority}</p>
          <p>Tech Stack: {projectDetails.techStack}</p>
        </div>
      </div>
    </div>
  );
}
