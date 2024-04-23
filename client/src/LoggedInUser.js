import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap"; // Import Form component from react-bootstrap
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";  
import UpdateUserInfoForm from "./UpdateUserInfoForm"; // Import the new component

const LoggedInUser = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const { authToken, logout } = useAuth();  
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to toggle the visibility of UpdateUserInfoForm
  const [testId, setTestId] = useState(''); // State to store the personality test ID

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
  
      console.log(error);
  
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
    } finally {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setPassword('');
    setShowModal(false);
  };

  const handleUpdateUserInfo = () => {
    // Toggle the visibility of UpdateUserInfoForm
    setShowUpdateForm(true);
  };

  const handleTestIdChange = (e) => {
    setTestId(e.target.value);
  };

  const handleSaveTestId = () => {
    // Logic to save the testId to the user or organization
    console.log('Test ID:', testId);
    // Add your logic here to save the testId
  };

  return (
    <div className="main">
      <Card style={{ width: '44rem' }}>
        <Card.Body>
          <Card.Title>Din profil</Card.Title>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Slett bruker
          </Button>

          {/* Button to toggle the visibility of UpdateUserInfoForm */}
          <Button variant="primary" onClick={handleUpdateUserInfo}>
            Oppdater brukerinformasjon
          </Button>

          {/* Add Form for entering test ID */}
          <Form>
            <Form.Group controlId="testId">
              <Form.Label>Personality Test ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter test ID" 
                value={testId} 
                onChange={handleTestIdChange} 
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveTestId}>
              Save Test ID
            </Button>
          </Form>

          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Please enter your password to confirm deletion:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteAccount}>
                Confirm Deletion
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>

      {/* Render the UpdateUserInfoForm component conditionally */}
      {showUpdateForm && <UpdateUserInfoForm />}
    </div>
  );
};

export default LoggedInUser;
