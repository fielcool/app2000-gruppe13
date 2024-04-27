import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <Link to="./">
        <img src="/images/logo.svg" alt="Logo" />
      </Link>
      </div>
    </nav>
  );
};

export default Header;

