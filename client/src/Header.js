import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white">
      <div className="container-fluid">
        <a href="/">
          <img src="https://sveeee.vercel.app/_nuxt/img/7bc354c.svg" alt="Logo" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
