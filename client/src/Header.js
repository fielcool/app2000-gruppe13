import React from 'react';
import { Link } from 'react-router-dom';
import brainImage from './images/logo.svg'; // Import the image
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/">
          <img src={brainImage} alt="Logo" className="navbar-brand" style={{ maxHeight: '50px', marginRight: '10px' }} />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
