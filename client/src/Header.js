import React from 'react';
import brainImage from './images/logo.svg'; // Import the image

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img src={brainImage} alt="Logo" /> {/* Use the imported image */}
      </div>
    </nav>
  );
};

export default Header;
