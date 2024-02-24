import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Medium.css";
import "./Small.css";
//import UpdateUserInfoForm from './UpdateUserInfoForm'; // Import the UpdateUserInfoForm component

export default function App() {
  const navigate = useNavigate();

  const handleUserCreationClick = () => {
    navigate("/CreateUserForm");
  };

  const handleUserLoginClick = () => {
    navigate("/LoginUser");
  };

  const handleUpdateUserInfoClick = () => {
    navigate("/UpdateUserInfo");
  };

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
        <button onClick={handleUpdateUserInfoClick} className="update-user-info-button">
          Update User Info
        </button>
        {/* Remove the UpdateUserInfoForm component from here */}
      </div>
    </div>
  );
}
