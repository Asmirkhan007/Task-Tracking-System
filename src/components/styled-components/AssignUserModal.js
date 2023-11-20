import React, { useState } from "react";

import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";

const AssignUsersModal = ({
  open,
  onClose,
  selectedUsers,
  setSelectedUsers,
  onConfirm,
  userData,
}) => {
  const handleUserSelection = (userId) => {
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
    // Assuming you don't want to reload the whole page, use appropriate logic here
  };
  console.log(userData);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxWidth: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh", // Set a maximum height for the container
          overflow: "auto",
        }}
      >
        <Typography variant="h6">Assign Users to this project:</Typography>
        <Typography>Note: Select users by checking the checkboxes.</Typography>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {userData && userData.length > 0 ? (
            userData.map((user) => (
              <Card
                key={user.id}
                style={{
                  width: "30%",
                  margin: "0 10px 10px 0",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography>Role: {user.role}</Typography>
                  <Link
                    to={`/user-details/${user.id}`}
                    className="view-details-link"
                  >
                    <Button variant="outlined" color="primary">
                      more details
                    </Button>
                  </Link>
                  <Checkbox
                    onChange={() => handleUserSelection(user.id)}
                    checked={selectedUsers.includes(user.id)}
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No users available
            </Typography>
          )}
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AssignUsersModal;
