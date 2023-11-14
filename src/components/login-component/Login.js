import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dummyProjects from "../project-component/projectArray";
import userArray from "../user-component/userArray";
import { v4 as uuidv4 } from "uuid";
import "./Login.css";
import loginImage from "../../assets/login.avif";

const Login = ({ setUserIsLoggedIn }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    getProjectData();
    getUserData();
  }, []);

  const onSubmit = (data) => {
    const { username, password } = data;
    const users = JSON.parse(localStorage.getItem("userData"));
    const lowercaseUsername = username.toLowerCase();
    const foundUser = users.find(
      (user) =>
        (user.name.toLowerCase() === lowercaseUsername ||
          user.email.toLowerCase() === lowercaseUsername) &&
        user.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/user/" + foundUser.id);
    } else if (
      (lowercaseUsername === "admin" ||
        lowercaseUsername === "admin@thirantech.com") &&
      password === "pass1234"
    ) {
      localStorage.setItem("isLoggedIn", true);
      setUserIsLoggedIn(true);
      navigate("/");
    } else {
      setErrorMessage("Invalid username or password");
    }

    // Clear the password in the form data
    setValue("password", "");
  };

  const getProjectData = () => {
    const projectData = JSON.parse(localStorage.getItem("projectData"));

    if (!projectData) {
      // If project data is missing, create default projects with UUIDs
      const projectsWithUUIDs = dummyProjects.map((project) => ({
        ...project,
        id: uuidv4(),
      }));

      // Store the default project data in local storage
      localStorage.setItem("projectData", JSON.stringify(projectsWithUUIDs));
    }
  };

  const getUserData = () => {
    const storedUsers = JSON.parse(localStorage.getItem("userData"));

    if (!storedUsers) {
      // If user data is missing, create default users with UUIDs
      const usersWithIds = userArray.map((user) => ({
        ...user,
        id: uuidv4(),
      }));

      // Store the default user data in local storage
      localStorage.setItem("userData", JSON.stringify(usersWithIds));
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={loginImage} alt="Login" />
        </div>
        <form
          name="login-form"
          onSubmit={handleSubmit(onSubmit)}
          id="login-form"
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-item">
            <label htmlFor="username">Username or Email Id</label>
            <input
              type="text"
              name="username"
              id="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <br />
          <div className="form-item">
            <button type="submit" className="login-form-button">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
