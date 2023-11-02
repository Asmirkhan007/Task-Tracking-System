import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/thiran.jpg";

const brightNavLinkStyle = {
  color: "#00bcd4", // Change the color to your desired bright color
  fontWeight: "bold", // Make the text bolder
  fontSize: "28px", // Adjust the font size as needed
};
const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/adduser" className="flex-column">
      <Nav.Link as={Link} to="/adduser" style={brightNavLinkStyle}>
        Add Users
      </Nav.Link>
      <Nav.Link as={Link} to="/users" style={brightNavLinkStyle}>
        Users Table
      </Nav.Link>
      <Nav.Link as={Link} to="/addproject" style={brightNavLinkStyle}>
        Add Projects
      </Nav.Link>
      <Nav.Link as={Link} to="/projects" style={brightNavLinkStyle}>
        Project Table
      </Nav.Link>
    </Nav>
  );
};


const CustomNavbar = () => {
  return (
    
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          width="30"
          height="60"
          className="d-inline-block align-top mr-2"
          alt="Thiran Logo"
        />
        <span style={{ ...brightNavLinkStyle, fontSize: "34px" }}>
          Task Management System
        </span>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <NavDropdown
          title="Users"
          id="basic-nav-dropdown"
          style={brightNavLinkStyle}
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
          style={brightNavLinkStyle}
        >
          <NavDropdown.Item as={Link} to="/addproject">
            Add Projects
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/projects">
            Project Table
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
