import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoggedInUser = ({ authToken }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');

  const handleDeleteAccount = async () => {
    console.log('Auth Token:', authToken);
  
    // Log the request headers just before making the request
    console.log('Request headers:', {
      Authorization: `Bearer ${authToken}`,
    });
  
    try {
      // Replace "user_password_here" with the actual user's password
      const userPassword = "user_password_here";
  
      // Make an API request to delete the user account
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
        // If the account is deleted successfully, you can perform additional actions
        console.log('Account deleted successfully');
        // Redirect to the front page after deletion
        navigate('/');
      } else {
        console.error('Failed to delete account:', response.data);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
  
      // Log the entire error object
      console.log(error);
  
      // Or log specific properties
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
    } finally {
      // Close the modal whether the deletion was successful or not
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    // Reset the password state and close the modal
    setPassword('');
    setShowModal(false);
  };

  return (
    <div className="main">
      <Card style={{ width: '44rem' }}>
        <Card.Img variant="top" src="https://ninjatables.com/wp-content/uploads/2023/07/Best-Data-Comparison-Charts.jpg" />
        <Card.Body>
          <Card.Title>Your Profile</Card.Title>
          {/* Add other profile information here */}
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Delete Account
          </Button>

          {/* Modal for password entry */}
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
    </div>
  );
};

export default LoggedInUser;
