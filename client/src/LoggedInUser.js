import React from "react";
import { Card } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const LoggedInUser = ({ authToken }) => {
  const handleDeleteUser = async () => {
    try {
      // Make a DELETE request to the deleteUser endpoint
      await axios.delete('/api/delete', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });
  
      // Optionally, you can navigate the user to a different page or perform other actions
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      console.error('Full error response:', error.response); // Log the full error response for more details
      // Handle the error based on your application's requirements
    }
  };

const LoggedInUser = () => {
  return (
    <div className="main">
      <Card style={{ width: '88rem' }}>
        <Card.Img variant="top" src="https://ninjatables.com/wp-content/uploads/2023/07/Best-Data-Comparison-Charts.jpg" />
        <Card.Body>
          <Card.Title>Logged In User</Card.Title>
          <Card.Text>
            Welcome! This is your profile. Add more content as needed.
          </Card.Text>
          <Card.Title>Bruker som er logget inn</Card.Title>
          {userData ? (
            <>
              <Card.Text>
                Welcome, {userData.email}! This is your profile. Add more content as needed.
              </Card.Text>
              {/* You can display more user information as needed */}
            </>
          ) : (
            <p>Loading user data...</p>
          )}
          {/* Button to delete the user */}
          <Button variant="danger" onClick={handleDeleteUser}>
            Slett min bruker
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoggedInUser;
