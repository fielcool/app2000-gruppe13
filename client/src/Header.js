import React from 'react';
import brainImage from './images/logo.svg'; // Import the image
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
      <a href="/">
      <img src={brainImage} alt="Logo" className="navbar-brand" style={{ maxHeight: '50px', marginRight: '10px' }} />
      </a>
      </div>
    </nav>
  );
};

export default Header;
