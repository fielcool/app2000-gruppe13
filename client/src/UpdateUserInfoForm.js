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
        navigate('/profile'); // Navigate to the profile page after successful update
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
        {/* ... (unchanged) */}

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
          Update User Info
        </Button>
      </Form>

      {/* Modal for password confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="password"
            placeholder="Enter your password to confirm"
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
