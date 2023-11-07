import React from "react";

const AssignUsersModal = ({
  open,
  onClose,
  selectedUsers,
  setSelectedUsers,
  onConfirm,
  userData,
}) => {
  if (!open) return null;

  const handleUserSelection = (e) => {
    // Update the selected users when the multi-select input changes
    console.log("working");
    const selectedUserIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedUsers(selectedUserIds);
  };

  const handleConfirm = () => {
    // Call the onConfirm function to update the selectedUsers in the parent component
    onConfirm();
    onClose(); // Close the modal after confirming
    window.location.reload();
  
  };

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            {userData.length === 0 ? (
              <p>No data available ! Please add new user</p>
            ) : (
              <>
                <p>Assign Users to this project:</p>
                <select
                  name="selectedUsers"
                  multiple
                  onChange={handleUserSelection}
                  value={selectedUsers}
                >
                  {userData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className="btnContainer">
            <button className="btnPrimary" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="btnOutline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUsersModal;
