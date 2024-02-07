import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Medium.css";
import "./Small.css";

export default function App() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Use the navigate function to go to the "EngStart" page
    navigate("/EngStart");
  };

  return (
    <div className="main">
      <div className="start-text">
        <h1 className="intro-heading">testing testing</h1>
        <button onClick={handleLoginClick} className="login-button">
          Opprett ny bruker
        </button>
      </div>
    </div>
  );
}
