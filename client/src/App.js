// App.jsx
// This component handles the main application routing and layout for the Big Five personality test overview application.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer'; 
//import "./App.css";
//import "./Medium.css";
import "./Small.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  // useNavigate hook from React Router for navigation
  const navigate = useNavigate();

  // Handles click for creating a new user
  const handleUserCreationClick = () => {
    navigate("/CreateUserForm");
  };

  // Handles click for user login
  const handleUserLoginClick = () => {
    navigate("/LoginUser");
  };

  return (
    <>
      <Header /> 
      <div className="main text-center">
        <h1>Big Five personlighetstestoversikt for organisasjoner</h1>
        <button onClick={handleUserLoginClick} className="btn btn-info btn-md fp-button shadow-custom">
          Logg inn
        </button>
        <button onClick={handleUserCreationClick} className="btn btn-info btn-md fp-button shadow-custom">
          Opprett ny bruker
        </button>
      </div>
      <Footer /> 
    </>
  );
}
