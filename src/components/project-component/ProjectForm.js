import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./css/ProjectForm.css";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]); // State to store selected users
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (id) {
      const item = localStorage.getItem("projectData");
      if (item) {
        const projectData = JSON.parse(item);
        const projectToEdit = projectData.find((project) => project.id === id);
        if (projectToEdit) {
          reset(projectToEdit);
          setSelectedUsers(projectToEdit.selectedUsers || []); // Load selected users if available
        }
      }
    }
  }, [id, reset]);

   const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const onSubmit = (data) => {
    const existingProjectData =
      JSON.parse(localStorage.getItem("projectData")) || [];
    if (id) {
      const updatedProjectData = existingProjectData.map((project) =>
        project.id === id ? { ...project, ...data, selectedUsers } : project
      );
      localStorage.setItem("projectData", JSON.stringify(updatedProjectData));
    } else {
      const newProject = { ...data, id: uuidv4(), selectedUsers };
      const updatedProjectData = [...existingProjectData, newProject];
      localStorage.setItem("projectData", JSON.stringify(updatedProjectData));
    }
    reset();
    navigate("/projects");
  };

  const handleUserSelectChange = (e) => {
    const selectedUserIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
     console.log("Selected User IDs:", selectedUserIds);
    setSelectedUsers(selectedUserIds);
  };

  const displayError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="error-message">{errors[fieldName].message}</p>
    ) : null;
  };
  const selectedUserTagClass = "selected-user-tag";
  return (
    <>
      <h1>{id ? "Edit Project" : "Add New Project"}</h1>
      <div className="form-control">
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
            {...register("selectedUsers", {
              required: "Assign at least one user",
            })}
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

        {/* Display selected users as tags with CSS */}
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
            <button type="submit">{id ? "Save" : "Submit"}</button>
            {id && (
              <Link to="/projects">
                <button>Cancel</button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
