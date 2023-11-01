import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function Home() {
  return (
    <div className="homepage">
      <div className="sidebar">
        <div className="logo">
          <h1>Your Logo</h1>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="/users">View Users</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/adduser">Add User</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="main-content">
        <header>
          <h1>Welcome to Your App</h1>
        </header>
        <section className="navigation-boxes">
          <div className="navigation-box">
            <Link to="/users">
              <h2>View Users</h2>
              <p>Click here to view existing users.</p>
            </Link>
          </div>
          <div className="navigation-box">
            <Link to="/adduser">
              <h2>Add User</h2>
              <p>Click here to add a new user.</p>
            </Link>
          </div>
          <div className="navigation-box">
            <Link to="/projects">
              <h2>View Projects</h2>
              <p>Click here to view existing users.</p>
            </Link>
          </div>
          <div className="navigation-box">
            <Link to="/addproject">
              <h2>Add Projects</h2>
              <p>Click here to add a new project.</p>
            </Link>
          </div>
        </section>
     
      </main>
    </div>
  );
}
