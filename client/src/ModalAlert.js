// ModalAlert.js
// This component provides a modal alert popup using React Bootstrap components.
// It displays a simple message prompting the user to fill in all fields when a form validation fails.
// The modal can be closed using an 'OK' button.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import { Modal, Button } from "react-bootstrap";
import React from "react";

export default function ModalAlert(props) {
  return (
    <div className="modal-div">
      {/* Modal component that shows dynamically based on 'show' prop */}
      <Modal show={props.show} onHide={props.close} className="modal-window">
        <Modal.Body>
            {/* Message displayed within the modal */}
            Vennligst fyll inn alle felt
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close the modal */}
          <Button
            variant="outline-dark"
            onClick={props.close}
            className="modal-btn"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
