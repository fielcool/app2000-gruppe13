import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function UpdateUserInfoForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { authToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Show password confirmation modal
      setShowModal(true);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirmUpdate = async () => {
    try {
      // Make API request to update user information
      const response = await axios.put(
        '/api/update-user-info',
        {
          oldPassword: passwords.oldPassword,
          newUserInfo: {
            navn: passwords.newPassword,
            // Include other fields as needed
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

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
        {/* Input fields for old and new passwords */}
        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your old password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Button to trigger the update process */}
        <Button variant="primary" onClick={handleUpdate}>
          Update User Info
        </Button>
      </Form>

      {/* Modal for password confirmation */}
      <Modal show={showModal} onHide={handleClose}>
        {/* ... (unchanged) */}
        <Button variant="primary" onClick={handleConfirmUpdate}>
          Confirm Update
        </Button>
      </Modal>
    </div>
  );
}

export default UpdateUserInfoForm;
