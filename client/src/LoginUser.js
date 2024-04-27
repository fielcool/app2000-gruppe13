import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import LoggedInUser from "./LoggedInUser"; // Importing LoggedInUser component
import { useAuth } from './context/AuthContext'; // Importing useAuth hook
import { useNavigate } from 'react-router-dom'; 
import Header from './Header'; // Importing Header component
import Footer from './Footer'; // Importing Footer component

// Async function to log in user with provided credentials
async function loginUser(credentials) {
  try {
    const response = await axios.post('/api/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const token = response.data.token;
      console.log("Received token:", token);
      return token;
    } else {
      console.log('Server response:', response.data);
      console.error("Login failed - Status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    passord: "",
  });

  // Using the useAuth hook to access authentication state and functions
  const { authToken, login, logout } = useAuth();

  // Function to handle input change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Function to handle user login
  const handleLogin = (e) => {
    e.preventDefault();

    if (Object.values(credentials).some((value) => value === "")) {
      return;
    }

    loginUser(credentials)
      .then((token) => {
        if (token) {
          console.log("Login successful");
          login(token);
          localStorage.setItem('authToken', token);
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };
  const navigate = useNavigate(); // Initialize the useNavigate hook
  // Function to handle user logout
  const handleLogout = () => {
    // Perform any additional logout logic if needed
    logout();
    // Navigate to the home page after logout
    navigate('/');
    console.log("Logged out");
  };

  return (
    <>
    <Header />
    <div className="main">
    
      {authToken ? (
        <LoggedInUser authToken={authToken} />
      ) : (
        <Form onSubmit={handleLogin}>
          <Form.Group className="credentials-form m-credentials-form">
            {Object.keys(credentials).map((fieldName) => (
              <Form.Control
                key={fieldName}
                autoComplete="off"
                type={fieldName === 'passord' ? 'password' : 'text'}
                placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}*`}
                name={fieldName}
                value={credentials[fieldName]}
                onChange={handleChange}
                className="credentials-input m-credentials-input"
              />
            ))}
          </Form.Group>
          <Button type="submit" variant="primary" className="btn btn-info btn-md fp-button shadow-custom"  >
            Logg inn
          </Button>
        </Form>
      )}
    </div>
    <Footer /> 
    </>
  );
}

export default LoginForm;
