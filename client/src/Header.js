import React from 'react';
import logo from './images/logo.svg'; // Import the image

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-logo">
        <img src={logo} alt="Logo" /> {/* Use the imported image */}
      </div>
    </nav>
  );
};

export default Header;
