import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useAuth } from './context/AuthContext';

function UpdateUserInfoForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const { authToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdate = async () => {
    try {  
        if (!newUserInfo.navn || !newUserInfo.organisasjon || !newUserInfo.stillingstittel || !newUserInfo.email || !newUserInfo.passord || !confirmPassword) {
      setRequiredFieldsModal(true);
      return;
    }
      // Show password confirmation modal
      setShowModal(true);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const confirmUpdate = async () => {
    try {
      // Make API request to update user information
      const response = await axios.put('/api/update-user-info', {
        ...newUserInfo,
        confirmPassword: confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (response.status === 200) {
        console.log("User information updated successfully");
        navigate('/LoginUser'); 
      } else {
        console.error("Failed to update user information");
      }

      // Close the modal after update
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="update-user-info-form">
      <Form>
        {/* Input fields for new user information */}
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="navn"
            value={newUserInfo.navn}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your organization"
            name="organisasjon"
            value={newUserInfo.organisasjon}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your job title"
            name="stillingstittel"
            value={newUserInfo.stillingstittel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={newUserInfo.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="passord"
            value={newUserInfo.passord}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Button to trigger the update process */}
        <Button variant="primary" onClick={handleUpdate}>
          Oppdater brukerinformasjon
        </Button>
      </Form>

      {/* Modal for required fields */}
      <Modal show={requiredFieldsModal} onHide={handleCloseRequiredFieldsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Påkrevde felt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Vennligst fyll inn alle felt.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseRequiredFieldsModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for password confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="password"
            placeholder="Skriv inn gammelt passord for bekreftelse"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpdate}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateUserInfoForm;
