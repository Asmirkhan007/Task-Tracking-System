import React from "react";
import Logout from "../presentation/Logout"; // Import the presentation component
import { useNavigate } from "react-router-dom";

const LogoutContainer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isAdmin = JSON.parse(localStorage.getItem("isLoggedIn"));
    const isUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (isUser) {
      localStorage.removeItem("loggedInUser");
      navigate("/");
    }

    if (isAdmin) {
      localStorage.setItem("isLoggedIn", false);
      window.location.reload();
    }
  };

  return <Logout handleLogout={handleLogout} />;
};

export default LogoutContainer;
