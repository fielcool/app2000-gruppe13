// PasswordConfirmationModal.js
// This component displays a modal dialog prompting the user to confirm an action (like a password change)
// by entering their current password. It uses react-bootstrap components for UI consistency and better user experience.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PasswordConfirmationModal({ showModal, handleClose, handleConfirm, confirmPassword, handleConfirmPasswordChange }) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bekreft med gammelt passord</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Input field for old password confirmation */}
        <Form.Control
          type="password"
          placeholder="Vennligst skriv inn gammelt passord for å bekrefte"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </Modal.Body>
      <Modal.Footer>
        {/* Buttons to cancel or confirm the action */}
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PasswordConfirmationModal;
