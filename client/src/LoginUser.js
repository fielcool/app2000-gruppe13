import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 


async function loginUser(credentials) {
  try {
    const response = await axios.post('/api/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log("Login successful");
      return response.data.token;
    } else {
      console.log('Server response:', response.data);
      console.error("Login failed");
      return null;
    }
  } catch (error) {
    console.error("Error logging in:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }

    throw error;
  }
}

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    passord: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (Object.values(credentials).some((value) => value === "")) {
      // Handle empty fields
      return;
    }

    try {
      const { email, passord } = credentials;
      const token = await loginUser({ email, passord });

      if (token) {
        console.log("Login successful");
        
        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to the LoggedInUser page
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
              onChange={(e) => setCredentials({ ...credentials, [fieldName]: e.target.value })}
              className="credentials-input m-credentials-input"
            />
          ))}
        </Form.Group>
        <Button type="submit" variant="primary">
          Logg inn
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
