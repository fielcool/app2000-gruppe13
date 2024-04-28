// Header.js
// This component renders the Header for the application. Conditional logout button and home button
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Button } from 'react-bootstrap';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook
import brainImage from './images/logo.svg'; // Import the image
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { authToken, logout } = useAuth(); // Destructure authToken and logout from the useAuth hook
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle user logout and navigate to the home page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/">
          <img src={brainImage} alt="Logo" className="navbar-brand" style={{ maxHeight: '50px', marginRight: '25%' }} />
        </Link>
        {authToken && ( // Render the logout button only if authToken is truthy (i.e., user is logged in)
          <Button variant="danger" onClick={handleLogout}> {/* Use handleLogout instead of logout */}
            Logg ut
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
