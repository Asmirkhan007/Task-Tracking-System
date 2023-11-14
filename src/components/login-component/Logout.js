import React from "react";
import "./Logout.css";

const Logout = () => {

  const handleLogout = () => {
    // Clear user data from localStorage
    const isAdmin = JSON.parse(localStorage.getItem("isLoggedIn"));
    const isUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (isUser) {
      localStorage.removeItem("loggedInUser");
    }

    if (isAdmin) {
      localStorage.setItem("isLoggedIn", false);
    }
    // Reload the page after logout
    window.location.reload();
    
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
