import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./UserForm.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function UserForm() {
  const { id } = useParams();
     const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (id) {
      const item = localStorage.getItem("userData");
      if (item) {
        const userData = JSON.parse(item);
        const userToEdit = userData[id];
        if (userToEdit) {
          reset(userToEdit);
        }
      }
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];
    if (id) {
      const updatedUserData = existingUserData.map((user, index) =>
        index === parseInt(id) ? data : user
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    } else {
      const updatedUserData = [...existingUserData, data];
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    reset();
     navigate("/users");
  };
  const displayError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="error-message">{errors[fieldName].message}</p>
    ) : null;
  };

  return (
    <>
      <h1> Add New User</h1>
      <div className="form-control">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-element">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {displayError("name")}
          </div>
          <div className="form-element">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {displayError("email")}
          </div>
          <div className="form-element">
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Enter your role"
              {...register("role", { required: "Role is required" })}
            />
            {displayError("role")}
          </div>
          <div className="form-element">
            <label>Contact number</label>
            <input
              type="tel" // Use type "tel" for phone numbers
              name="number"
              placeholder="Enter your contact number"
              {...register("number", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                  message: "Contact number should have 10 digits",
                },
              })}
            />
            {displayError("number")}
          </div>
          <div className="form-element">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              placeholder="Enter your years of experience"
              {...register("experience", { value: 0 })} // Set default value to 0
            />
          </div>
          <div className="form-element">
            <label>Gender</label>
            <div className="inline-radio">
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  {...register("gender", { required: "Gender is required" })}
                  value="female"
                />
                <label htmlFor="female">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  {...register("gender", { required: "Gender is required" })}
                  value="male"
                />
                <label htmlFor="male">Male</label>
              </div>
            </div>
            {displayError("gender")}
          </div>
          <div className="form-element">
            <button type="submit">{id ? "Save" : "Submit"}</button>
            {id && (
              <Link to="/users">
                <button>Cancel</button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
