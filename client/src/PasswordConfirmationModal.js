// PasswordConfirmationModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PasswordConfirmationModal({ showModal, handleClose, handleConfirm, confirmPassword, handleConfirmPasswordChange }) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bekreft med gammelt passord</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="password"
          placeholder="Vennligst skriv inn gammelt passord for å bekrefte"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </Modal.Body>
      <Modal.Footer>
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
