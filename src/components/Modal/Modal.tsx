// Modal.tsx
import React from "react";
import "./Modal.scss";
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="content">
        <button onClick={closeModal} className="closeButton">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
