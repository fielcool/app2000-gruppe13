// LoggedInUser.jsx
// This component represents the user profile page where users can view their profile options, update information,
// navigate to organizational overview, or delete their account.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";  
import UpdateUserInfoForm from "./UpdateUserInfoForm"; 
import PersonalityTestIdForm from "./PersonalityTestIdForm"; 

const LoggedInUser = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the delete account confirmation modal
  const [password, setPassword] = useState(''); // State for storing the password input for account deletion
  const { authToken, logout } = useAuth();  // Authentication token from AuthContext and logout function
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to toggle visibility of the update user info form

  // Handle account deletion
  const handleDeleteAccount = async () => {
    console.log('Auth Token:', authToken);
    console.log('Request headers:', {
      Authorization: `Bearer ${authToken}`,
    });

    try {
      const userPassword = password;
      const response = await axios.delete('https://b5-usn-506fb35bcb0a.herokuapp.com/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
        data: {
          password: userPassword,
        },
      });

      if (response.status === 200) {
        console.log('Account deleted successfully');
        logout();
        navigate('/');
      } else {
        console.error('Failed to delete account:', response.data);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
    } finally {
      setShowModal(false);  // Hide the modal regardless of outcome
    }
  };

  // Handle modal cancellation
  const handleCancel = () => {
    setPassword('');
    setShowModal(false);
  };

  // Handle updating user information
  const handleUpdateUserInfo = () => {
    setShowUpdateForm(true);
  };

  // Navigate to the organization overview
  const handleGoToOrgOverview = () => {
    navigate('/OrgOverview');
  };

  return (
    <div className="main">
      <Card>
        <Card.Body>
          <Card.Title><h1>Din profil</h1></Card.Title>
          <Button variant="info" onClick={handleGoToOrgOverview} className="btn btn-info btn-md fp-button shadow-custom">
            Organisasjonsoversikt
          </Button>
          <Button variant="primary" onClick={handleUpdateUserInfo} className="btn btn-primary btn-md fp-button">
            Oppdater brukerinformasjon
          </Button>
          <Button variant="danger" onClick={() => setShowModal(true)} className="btn btn-danger btn-md fp-button shadow-custom">
            Slett bruker
          </Button>
          <PersonalityTestIdForm authToken={authToken} className="btn btn-info btn-md fp-button shadow-custom" />
          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Vennligst skriv inn passordet ditt for å bekrefte sletting av bruker:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Avbryt
              </Button>
              <Button variant="danger" onClick={handleDeleteAccount}>
                Bekreft
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
      {showUpdateForm && <UpdateUserInfoForm />}
    </div>
  );
};

export default LoggedInUser;
