import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalAlert(props) {
  return (
    <div className="modal-div">
      <Modal show={props.show} onHide={props.close} className="modal-window">
        <Modal.Body>
          {props.content}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={props.close}
            className="modal-btn"
          >
            {props.buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
