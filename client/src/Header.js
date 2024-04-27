import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook
import brainImage from './images/logo.svg'; // Import the image
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { authToken, logout } = useAuth(); // Destructure authToken and logout from the useAuth hook

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/">
          <img src={brainImage} alt="Logo" className="navbar-brand" style={{ maxHeight: '50px', marginRight: '25%' }} />
        </Link>
        {authToken && ( // Render the logout button only if authToken is truthy (i.e., user is logged in)
          <Button variant="danger" onClick={logout}>
            Logg ut
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
