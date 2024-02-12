import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoggedInUser = ({ authToken }) => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    console.log('Auth Token:', authToken);
    try {
      // Make an API request to delete the user account
      const response = await axios.delete('/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
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
    }
  };

  return (
    <div className="main">
      <Card style={{ width: '44rem' }}>
        <Card.Img variant="top" src="https://ninjatables.com/wp-content/uploads/2023/07/Best-Data-Comparison-Charts.jpg" />
        <Card.Body>
          <Card.Title>Your Profile</Card.Title>
          {/* Add other profile information here */}
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoggedInUser;
