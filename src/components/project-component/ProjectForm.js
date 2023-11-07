import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../styled-components/Button";
import "./css/ProjectForm.css";
import CustomNavbar from "../styled-components/Navbar";

export default function ProjectForm() {
  // Get the project ID from the URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // State for selected users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Use useEffect to prefill form data when editing a project
  useEffect(() => {
    if (id) {
      const item = localStorage.getItem("projectData");
      if (item) {
        const projectData = JSON.parse(item);
        const projectToEdit = projectData.find((project) => project.id === id);
        if (projectToEdit) {
          // Reset the form with project data and set selected users
          reset(projectToEdit);
          setSelectedUsers(projectToEdit.selectedUsers || []);
        }
      }
    }
  }, [id, reset]);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  // Form submission handler
  const onSubmit = (data) => {
    // Get existing project data or an empty array
    const existingProjectData =
      JSON.parse(localStorage.getItem("projectData")) || [];

    if (id) {
      // Update an existing project if editing
      const updatedProjectData = existingProjectData.map((project) =>
        project.id === id ? { ...project, ...data, selectedUsers } : project
      );
      localStorage.setItem("projectData", JSON.stringify(updatedProjectData));
    } else {
      // Create a new project if not editing
      const newProject = { ...data, id: uuidv4(), selectedUsers };
      const updatedProjectData = [...existingProjectData, newProject];
      localStorage.setItem("projectData", JSON.stringify(updatedProjectData));
    }

    // Reset the form and navigate to the projects page
    reset();
    navigate("/projects");
  };

  // Handle user selection change
  const handleUserSelectChange = (e) => {
    const selectedUserIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedUsers(selectedUserIds);
  };

  // Display error messages for form fields
  const displayError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="error-message">{errors[fieldName].message}</p>
    ) : null;
  };

  // CSS class for selected user tags
  const selectedUserTagClass = "selected-user-tag";

  return (
    <>
      <CustomNavbar />
      <br />
      <h1>{id ? "Edit Project" : "Add New Project"}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter project name"
            {...register("name", { required: "Project name is required" })}
          />
          {displayError("name")}
        </div>
        <div className="form-element">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter project description"
            {...register("description", {
              required: "Project description is required",
            })}
          />
          {displayError("description")}
        </div>
        <div className="form-element">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            {...register("startDate", { required: "Start date is required" })}
          />
          {displayError("startDate")}
        </div>
        <div className="form-element">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            {...register("endDate", { required: "End date is required" })}
          />
          {displayError("endDate")}
        </div>
        <div className="form-element">
          <label>Priority</label>
          <select
            name="priority"
            {...register("priority", { required: "Priority is required" })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {displayError("priority")}
        </div>
        <div className="form-element">
          <label>Tech Stack</label>
          <input
            type="text"
            name="techStack"
            placeholder="Enter project tech stack"
            {...register("techStack", { required: "Tech stack is required" })}
          />
          {displayError("techStack")}
        </div>
        <div className="form-element">
          <label>Assign Users</label>
          <select
            name="selectedUsers"
            multiple
            {...register("selectedUsers")}
            onChange={handleUserSelectChange}
            value={selectedUsers}
          >
            {userData.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {displayError("selectedUsers")}
        </div>

        <div className="form-element">
          <label>Selected Users:</label>
          <div className="selected-users-tags">
            {selectedUsers.map((userId) => {
              const user = userData.find((u) => u.id === userId);
              return (
                <span key={userId} className={selectedUserTagClass}>
                  {user.name}
                </span>
              );
            })}
          </div>
        </div>
        <div className="form-element">
          <Button type="submit">{id ? "Save" : "Submit"}</Button>
          {id && (
            <Link to="/projects">
              <Button>Cancel</Button>
            </Link>
          )}
        </div>
      </form>
    </>
  );
}
