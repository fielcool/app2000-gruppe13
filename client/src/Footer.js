// Footer.js
// This component renders the footer for the application. It includes a message about the website's purpose
// and its association with educational projects.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-4">
      <div className="container text-center py-3">
        {/* Footer content describing the project and its educational purpose */}
        <p> Denne nettsiden er ment som en tilleggsfunksjon for https://bigfive-test.com/ som del av Rubynors skolesamarbeid til app2000 for IT og informasjonssystemer. <br/>
        MIT-license prosjekt ved Universitet i Sørøst-Norge.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
