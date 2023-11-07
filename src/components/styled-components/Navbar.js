import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/thiran.jpg";
import "./Navbar.css"; // Import the CSS file
import Logout from "../login-component/Logout";


const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          className="navbar-brand-img" // Apply your custom class to the image
          alt="Thiran Logo"
        />
        <span className="navbar-brand-text centered-text">
          Task Management System
        </span>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <NavDropdown
          title="Users"
          id="basic-nav-dropdown"
          className="nav-dropdown-item"
        >
          <NavDropdown.Item as={Link} to="/adduser">
            Add Users
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/users">
            Users Table
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title="Project"
          id="basic-nav-dropdown"
          className="nav-dropdown-item"
        >
          <NavDropdown.Item as={Link} to="/addproject">
            Add Projects
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/projects">
            Project Table
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Logout />
    </Navbar>
  );
};

export default CustomNavbar;
