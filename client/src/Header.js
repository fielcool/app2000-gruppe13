import React from 'react';
import logo from './images/logo.svg'; // Import the image
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-logo">
      <img src={logo} alt="Logo" />
      </div>
    </nav>
  );
};

export default Header;
