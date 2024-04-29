// UpdateUserInfoForm.js
// This component manages the user information update process including input fields and update confirmation.
// It utilizes a modal for password confirmation before submitting changes.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import UserInfoFields from './UserInfoFields';  // Component for user input fields
import PasswordConfirmationModal from './PasswordConfirmationModal'; 
import axios from "axios";

function UpdateUserInfoForm() {
  const navigate = useNavigate();
  // State for controlling the display of the password confirmation modal
  const [showModal, setShowModal] = React.useState(false);
  // State for storing updated user information
  const [newUserInfo, setNewUserInfo] = React.useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: ""
  });
  // State for storing the confirmation password input
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { authToken } = useAuth();  // Authentication token from the context

  // Handles changes to each input field and updates the state
  const handleChange = (name, value) => {
    setNewUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  // changes the password if a new password is input and confirmed
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Triggers the display of the confirmation modal
  const handleUpdate = () => {
    setShowModal(true);
  };

  // Confirms the update after password validation and submits the data to the server
  const confirmUpdate = async () => {
    try {
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
        navigate('/LoginUser');  // Redirects to login page on successful update
      } else {
        console.error("Failed to update user information");
      }

      setShowModal(false);  // Close the modal regardless of the result
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="update-user-info-form">
      <Form>
        {/* Component to render user input fields */}
        <UserInfoFields newUserInfo={newUserInfo} handleChange={handleChange} />
        <Button variant="primary" onClick={handleUpdate}>
          Oppdater brukerkonto
        </Button>
      </Form>

      {/* Modal component for password confirmation before update */}
      <PasswordConfirmationModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={confirmUpdate}
        confirmPassword={confirmPassword}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
      />
    </div>
  );
}

export default UpdateUserInfoForm;
