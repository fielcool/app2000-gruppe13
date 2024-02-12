<<<<<<< HEAD
import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";

const LoggedInUser = ({ authToken }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteUser = async () => {
    try {
      setShowConfirmation(false);
      setIsDeleting(true);

      await axios.delete('/api/delete', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      console.log('User deleted successfully');
      // Optionally, you can navigate the user to a different page or perform other actions
    } catch (error) {
      console.error('Error deleting user:', error);
      console.error('Full error response:', error.response);
      // Handle the error based on your application's requirements
    } finally {
      setIsDeleting(false);
    }
  };

=======
import React from "react";
import { Card } from "react-bootstrap";

const LoggedInUser = () => {
>>>>>>> parent of 797ea28 (	modified:   client/src/LoggedInUser.js)
  return (
    <div className="main">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://ninjatables.com/wp-content/uploads/2023/07/Best-Data-Comparison-Charts.jpg" alt="User Image" />
        <Card.Body>
          <Card.Title>Logged In User</Card.Title>
          <Card.Text>
            Welcome! This is your profile. Add more content as needed.
          </Card.Text>
<<<<<<< HEAD
          <Button variant="danger" onClick={() => setShowConfirmation(true)}>
            Slett min bruker
          </Button>
=======
>>>>>>> parent of 797ea28 (	modified:   client/src/LoggedInUser.js)
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Er du sikker på at du vil slette brukeren din?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Avbryt
          </Button>
          <Button variant="danger" onClick={handleDeleteUser} disabled={isDeleting}>
            {isDeleting ? 'Sletter...' : 'Slett bruker'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoggedInUser;
