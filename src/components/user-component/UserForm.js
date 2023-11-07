import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // Import UUID generation function
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../styled-components/Button";
import CustomNavbar from "../styled-components/Navbar";
import "./css/UserForm.css";

export default function UserForm() {
  // Get the user ID from the URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Use useEffect to prefill form data when editing a user
  useEffect(() => {
    if (id) {
      const item = localStorage.getItem("userData");
      if (item) {
        const userData = JSON.parse(item);
        const userToEdit = userData.find((user) => user.id === id); // Assuming each user has a unique "id" field
        if (userToEdit) {
          reset(userToEdit);
        }
      }
    }
  }, [id, reset]);

  // Form submission handler
  const onSubmit = (data) => {
    // Get existing user data or an empty array
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    if (id) {
      // Update an existing user if editing
      const updatedUserData = existingUserData.map((user) =>
        user.id === id ? { ...user, ...data } : user
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    } else {
      // Create a new user if not editing
      const newUser = {
        ...data,
        id: uuidv4(),
        password: data.password,
        isLogged: false,
      }; // Add password and set isLogged to false
      const updatedUserData = [...existingUserData, newUser];
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }

    // Reset the form and navigate to the users page
    reset();
    navigate("/users");
  };

  // Display error messages for form fields
  const displayError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="error-message">{errors[fieldName].message}</p>
    ) : null;
  };

  return (
    <>
      <CustomNavbar />
      <br />
      <h1>{id ? "Edit User" : "Add New User"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should have at least 6 characters",
              },
            })}
          />
          {displayError("password")}
        </div>
        <div className="form-element">
          <label>Years of Experience</label>
          <input
            type="number"
            name="experience"
            placeholder="Enter your years of experience"
            {...register("experience", { value: 0 })} // Set default value to 0
            defaultValue={0}
          />
        </div>
        <div className="form-element">
          <label>Gender</label>
          <div className="inline-radio">
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
          </div>
          {displayError("gender")}
        </div>
        <div className="form-element">
          <Button type="submit">{id ? "Save" : "Submit"}</Button>
          {id && (
            <Link to="/users">
              <Button>Cancel</Button>
            </Link>
          )}
        </div>
      </form>
    </>
  );
}
