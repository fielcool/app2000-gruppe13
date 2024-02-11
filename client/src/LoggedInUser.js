import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const LoggedInUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to your backend route that returns the user information
        const response = await axios.get('/api/loggedInUser');
        setUserData(response.data.user); // Assuming your user information is in the 'user' field
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="main">
      <Card style={{ width: '44rem' }}>
        <Card.Img variant="top" src="https://ninjatables.com/wp-content/uploads/2023/07/Best-Data-Comparison-Charts.jpg" />
        <Card.Body>
          <Card.Title>Bruker som er logget inn</Card.Title>
          {userData ? (
            <>
              <Card.Text>
                Velkommen, {userData.email}! 
              </Card.Text>
              {/* You can display more user information as needed */}
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoggedInUser;
