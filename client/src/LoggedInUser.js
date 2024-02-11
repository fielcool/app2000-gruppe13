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
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoggedInUser;
