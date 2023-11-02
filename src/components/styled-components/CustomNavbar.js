import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/thiran.jpg";

const customNavbarStyle = {
  background: "darkslategray", // Change the background color to your desired color
  color: "white", // Text color
  display: "flex",
  alignItems: "center",
  padding: "10px",
};

const logoStyle = {
  width: "30px",
  height: "60px",
  marginRight: "10px",
};

const brightNavLinkStyle = {
  color: "#00bcd4", // Change the color to your desired bright color
  fontWeight: "bold", // Make the text bolder
  fontSize: "36px", // Adjust the font size as needed
  textDecoration: "none",
  marginLeft: "10px", // Adjust the margin as needed
};

const dropdownStyle = {
  display: "inline-block",
  marginRight: "20px",
};

const CustomNavbar = () => {
  return (
    <div style={customNavbarStyle}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={logo} style={logoStyle} alt="Thiran Logo" />
        <span style={{ ...brightNavLinkStyle, fontSize: "48px" }}>
          Task Management System
        </span>
      </Link>
      <div style={dropdownStyle}>
        <span style={brightNavLinkStyle}>Users</span>
        <div>
          <Link to="/adduser" style={brightNavLinkStyle}>
            Add Users
          </Link>
          <Link to="/users" style={brightNavLinkStyle}>
            Users Table
          </Link>
        </div>
      </div>
      <div style={dropdownStyle}>
        <span style={brightNavLinkStyle}>Project</span>
        <div>
          <Link to="/addproject" style={brightNavLinkStyle}>
            Add Projects
          </Link>
          <Link to="/projects" style={brightNavLinkStyle}>
            Project Table
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
