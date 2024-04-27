import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLogin, showSignup, handleUserLoginClick, handleUserCreationClick }) => {
  return (
    <div>
      <Link to="/">
        <img src="./images/logo.svg" alt="Logo" />
      </Link>
      {showLogin && <button onClick={handleUserLoginClick}>Logg inn</button>}
      {showSignup && <button onClick={handleUserCreationClick}>Opprett ny bruker</button>}
    </div>
  );
};

export default Header;
