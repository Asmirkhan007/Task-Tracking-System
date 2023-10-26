import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./UserTable.css";

export default function UserTable({ users }) {
  return (
    <div className="table-container">
      <h2>User Data</h2>
      <table>
        {/* ...Table header */}
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.number}</td>
              <td>{user.experience}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/edituser/${index}`}>
                  {" "}
                  {/* Include the user's ID in the URL */}
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
