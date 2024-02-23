import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoggedInUser = ({ authToken }) => {
  const navigate = useNavigate();
  
  const handleDeleteAccount = async () => {
    console.log('Auth Token:', authToken);
  
    // Log the request headers just before making the request
    console.log('Request headers:', {
      Authorization: `Bearer ${authToken}`,
    });
  
    try {
      const userPassword = "user_password_here";
  
      const response = await axios.delete('https://b5-usn-506fb35bcb0a.herokuapp.com/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
        data: {
          password: userPassword,
        },
      });
  
      console.log('Delete response:', response);
  
      if (response.status === 200) {
        console.log('Account deleted successfully');
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
