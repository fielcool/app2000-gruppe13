import React from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header'; 
import Footer from './Footer'; 
import "./App.css";
import "./Medium.css";
import "./Small.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const navigate = useNavigate();

  const handleUserCreationClick = () => {
    navigate("/CreateUserForm");
  };

  const handleUserLoginClick = () => {
    navigate("/LoginUser");
  };

  return (
    <>
      <Header /> 
      <div className="main text-center">
        <h1 className="intro-heading">Big Five personlighetstest for organisasjoner</h1>
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
