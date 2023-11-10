import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    const isAdmin = JSON.parse(localStorage.getItem("isLoggedIn"));
    const isUser = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log("Admin", isAdmin);
    console.log("User", isUser);

    if (isUser) {
      localStorage.removeItem("loggedInUser");
    }

    if (isAdmin) {
      localStorage.setItem("isLoggedIn", false);
    }

    // You can clear other relevant data or logout logic here if needed

    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
