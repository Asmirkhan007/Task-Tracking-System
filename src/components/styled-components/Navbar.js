import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../assets/thiran.jpg";
import Logout from "../login-component/container/LogoutContainer";
import "./Navbar.css"; // Import the CSS file

const CustomNavbar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will go back one step in the history
  };

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Collapse className="justify-content-start">
        <Button variant="outline-light" onClick={goBack}>
          <ArrowBackIcon />
        </Button>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="navbar-brand-img" alt="Thiran Logo" />
          <span className="navbar-brand-text">'s TMS</span>
        </Navbar.Brand>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        <Logout />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
