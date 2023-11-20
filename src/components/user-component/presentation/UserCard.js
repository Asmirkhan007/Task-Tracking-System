import React from "react";
import Modal from "../../styled-components/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function UserCard({ user, onClose }) {
  return (
    <Modal open={true} onClose={onClose}>
      <Card className="user-card">
        <CardContent>
          <Typography variant="h6">{user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Role: {user.role}</Typography>
          {/* Include additional user information as needed */}
        </CardContent>
        <Button onClick={onClose}>Close</Button>
      </Card>
    </Modal>
  );
}
