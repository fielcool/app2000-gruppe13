import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";  
import UpdateUserInfoForm from "./UpdateUserInfoForm"; 
import PersonalityTestIdForm from "./PersonalityTestIdForm"; 


const LoggedInUser = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const { authToken, logout } = useAuth();  
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [resultatId, setResultatId] = useState(null);

  useEffect(() => {
    // Fetch user data including resultatId
    axios.get('/api/userData')
      .then(response => {
        
        setResultatId(response.data.resultatId);
        console.log (response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleBeforeUnload = (e) => {
    if (!resultatId) {
      // Prevent the user from leaving the page
      e.preventDefault();
      // Prompt the user to complete the required action
      e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
    }
  };

  useEffect(() => {
    // Add event listener for beforeunload to check if user has unsaved changes
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [resultatId]);
  const handleDeleteAccount = async () => {
    console.log('Auth Token:', authToken);
  
    console.log('Request headers:', {
      Authorization: `Bearer ${authToken}`,
    });
  
    try {
      const userPassword = password;
  
      const response = await axios.delete('https://b5-usn-506fb35bcb0a.herokuapp.com/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
        data: {
          password: userPassword,
        },
      });
  
      if (response.status === 200) {
        console.log('Account deleted successfully');
        logout();
        navigate('/');
      } else {
        console.error('Failed to delete account:', response.data);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
  
      console.log(error);
  
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
    } finally {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setPassword('');
    setShowModal(false);
  };

  const handleUpdateUserInfo = () => {
    setShowUpdateForm(true);
  };

  const handleGoToOrgOverview = () => {
    // Navigate to OrgOverview site
    navigate('/OrgOverview');
  };

  return (
      <div className="main">
        <Card style={{ width: '36rem' }}>
          <Card.Body>
            <Card.Title>
              <h1>Din profil</h1>
              </Card.Title>
            <Button variant="info" onClick={handleGoToOrgOverview} className="btn btn-info btn-md fp-button shadow-custom">
              Organisasjonsoversikt
            </Button>

            <Button variant="primary" onClick={handleUpdateUserInfo} className="btn btn-primary btn-md fp-button">
              Oppdater brukerinformasjon
            </Button>

            <Button variant="danger" onClick={() => setShowModal(true)}className="btn btn-info btn-md fp-button shadow-custom">
              Slett bruker
            </Button>

            <PersonalityTestIdForm authToken={authToken}className="btn btn-info btn-md fp-button shadow-custom" />

            <Modal show={showModal} onHide={handleCancel}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Vennligst skriv inn passordet ditt for å bekrefte sletting av bruker:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                  Avbryt
                </Button>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Bekreft
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>

        {showUpdateForm && <UpdateUserInfoForm />}
      </div>

  );
};

export default LoggedInUser;
