import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user data from localStorage
    const isAdmin = JSON.parse(localStorage.getItem("isLoggedIn"));
    const isUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (isUser) {
      localStorage.removeItem("loggedInUser");
      navigate("/");
    }

    if (isAdmin) {
      localStorage.setItem("isLoggedIn", false);
      // Reload the page after logout
      window.location.reload();
    }
   
    
   
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
