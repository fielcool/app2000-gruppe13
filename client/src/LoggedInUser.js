import React from "react";
import { Card } from "react-bootstrap";

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
