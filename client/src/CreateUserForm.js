// CreateUserForm.js
// This component handles the user registration form. It manages state for form inputs and submits them to an API.
// It now includes validation alerts similar to those in the UserInfoFields component.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap"; // Include Alert for validation messages
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import Header from './Header'; 
import Footer from './Footer'; 

function CreateUserForm() {
  const navigate = useNavigate();
  const minLength = 2; // Minimum length for the password field

  const [input, setInput] = useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: "",
    testId: " ", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post('/api/createUser', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log("User registered successfully");
        return true;
      } else {

        console.error("User registration failed");
        return false;
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (Object.values(input).some(value => value === "")) {
      return; // Optionally, handle with modal/alert
    }

    try {
      const { navn, organisasjon, stillingstittel, email, passord, testId } = input;
      const isUserRegistered = await registerUser({ navn, organisasjon, stillingstittel, email, passord, testId });
      if (isUserRegistered) {
        navigate('/LoginUser');  
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
    <Header /> 
    <div className="main">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="credentials-form m-credentials-form">
          {Object.keys(input).map(fieldName => {
            if (fieldName !== 'testId') {
              return (
                <>
                  <Form.Control
                    key={fieldName}
                    autoComplete="off"
                    type={fieldName === 'passord' ? 'password' : 'text'}
                    placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}*`}
                    name={fieldName}
                    value={input[fieldName]}
                    onChange={handleChange}
                    className="credentials-input m-credentials-input"
                    required
                  />
                  {fieldName === 'organisasjon' && input.organisasjon.length === 0 && (
                    <Alert variant="danger">Organisasjon is required.</Alert>
                  )}
                  {fieldName === 'stillingstittel' && input.stillingstittel.length === 0 && (
                    <Alert variant="danger">Stillingstittel is required.</Alert>
                  )}
                  {fieldName === 'email' && (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) && (
                    <Alert variant="danger">Email is invalid.</Alert>
                  )}
                  {fieldName === 'passord' && input.passord.length < minLength && (
                    <Alert variant="danger">The password must be minimum {minLength} characters long.</Alert>
                  )}
                </>
              );
            }
          })}
        </Form.Group>
        <Button type="submit" variant="primary">Opprett bruker</Button>
      </Form>
    </div>
    <Footer /> 
    </>
  );
}

export default CreateUserForm;
