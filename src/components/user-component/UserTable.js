import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./css/UserTable.css";

export default function UserTable({ users, onDelete }) {
  return (
    <div className="user-cards-container">
      {users.map((user) => (
        <Card key={user.id} className="user-card">
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
            <Link to={`/user-details/${user.id}`} className="view-details-link">
              <Button variant="outlined" color="primary">
                View more details
              </Button>
            </Link>
            <div className="user-icons-container">
              <Link to={`/edituser/${user.id}`} className="icon-link">
                <EditIcon color="primary" />
              </Link>
              <DeleteIcon color="error" onClick={() => onDelete(user.id)} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
