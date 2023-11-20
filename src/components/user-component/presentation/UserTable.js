import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../css/UserTable.css";

export default function UserTable({ users, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  return (
    <>
      <div className="user-cards-container">
        {users.map((user) => (
          <Card key={user.id} className="user-card">
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Role: {user.role}</Typography>
              <Link
                to={`/user-details/${user.id}`}
                className="view-details-link"
              >
                <Button variant="outlined" color="primary">
                  View more details
                </Button>
              </Link>
              <div className="user-icons-container">
                <Link to={`/edituser/${user.id}`} className="icon-link">
                  <EditIcon color="primary" />
                </Link>
                <DeleteIcon
                  color="error"
                  onClick={() => openDeleteModal(user.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal open={openModal} onClose={closeDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Delete Confirmation</Typography>
          <Typography>Are you sure you want to delete this user?</Typography>
          <Button variant="contained" onClick={() => onDelete(selectedUserId)}>
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={closeDeleteModal}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
