import React from "react";
import loginImage from "../../../assets/login.avif";
import "../Login.css";

const Login = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  errorMessage,
}) => {
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
