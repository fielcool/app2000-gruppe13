import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useAuth } from './context/AuthContext';

function UpdateUserInfoForm() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [showModal, setShowModal] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: ""
  });

  const { authToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prevInfo) => ({
      ...prevInfo,
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

  const confirmUpdate = async () => {
    try {
      // Make API request to update user information
      const response = await axios.put('/api/update-user-info', newUserInfo, {
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

        {/* Button to trigger the update process */}
        <Button variant="primary" onClick={handleUpdate}>
          Update User Info
        </Button>
      </Form>

      {/* Modal for password confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {/* ... (unchanged) */}
      </Modal>
    </div>
  );
}

export default UpdateUserInfoForm;
