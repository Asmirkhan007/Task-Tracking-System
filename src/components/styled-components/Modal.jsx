import React from "react";

const Modal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="btnContainer">
            <button className="btnPrimary" onClick={onConfirm}>
              <span className="bold">YES</span>, delete
            </button>
            <button className="btnOutline" onClick={onClose}>
              <span className="bold">NO</span>, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
