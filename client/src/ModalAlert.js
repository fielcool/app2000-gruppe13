import { Modal, Button } from "react-bootstrap";
import React from "react";

export default function ModalAlert(props) {
  return (
    <div className="modal-div">
      <Modal show={props.show} onHide={props.close} className="modal-window">
        <Modal.Body>
        
            "Please fill in all required fields"
      
        </Modal.Body>
        <Modal.Footer>
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
