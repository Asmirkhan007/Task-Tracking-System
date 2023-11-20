import React from "react";
import "../Logout.css";

const Logout = ({ handleLogout }) => {
  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
