import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Medium.css";
import "./Small.css";

export default function App() {
  const navigate = useNavigate();

  const handleUserCreationClick = () => {
    // Use the navigate function to go to the "EngStart" page
    navigate("/CreateUserForm");
  };

  const handleUserLoginClick = () => {
    navigate ("/UserLogin");
  }

  return (
    <div className="main">
      <div className="start-text">
        <h1 className="intro-heading">testing testing</h1>
        <button onClick={handleUserLoginClick} className="user-login-button">
          Logg inn 
          </button>
        <button onClick={handleUserCreationClick} className="create-user-button">
          Opprett ny bruker
        </button>
      </div>
    </div>
  );
}
