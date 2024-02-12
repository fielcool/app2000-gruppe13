import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LoggedInUser from "./LoggedInUser";
async function loginUser(credentials) {
  try {
    const response = await axios.post('/api/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log("Login successful");
      const token = response.data.token;
      console.log("Received token:", token);
      return token;
    } else {
      console.log('Server response:', response.data);
      console.error("Login failed - Status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error logging in:", error);  // Log the error details
    throw error;  // Rethrow the error for the calling code to handle
  }
}


function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    passord: "",
  });

  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (Object.values(credentials).some((value) => value === "")) {
      // Show modal alert or handle the empty fields case as needed
      return;
    }

    try {
      const { email, passord } = credentials;
      const token = await loginUser({ email, passord });

      if (token) {
        console.log("Login successful");
        setAuthToken(token);
        localStorage.setItem('authToken', token); // Lagrer token i lokal lagring
        navigate('/LoggedInUser');
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error based on your application's requirements
    }
  };

  return (
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
          <Button type="submit" variant="primary">
            Logg inn
          </Button>
        </Form>
      )}
    </div>
  );
}

export default LoginForm;
