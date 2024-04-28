// CreateUserForm.js
// This component handles the user registration form. It manages state for form inputs and submits them to an API.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import Header from './Header'; 
import Footer from './Footer'; 

function CreateUserForm() {
  const navigate = useNavigate();  // Use the useNavigate hook for redirecting after actions

  // State management for form inputs
  const [input, setInput] = useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: "",
    testId: " ", 
  });

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Register user with provided data to the server
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
        console.log('Server response:', response.data);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', input);

    // Prevent submission if any field is empty
    if (Object.values(input).some((value) => value === "")) {
      // Show modal alert or handle the empty fields case as needed
      return;
    }

    try {
      const { navn, organisasjon, stillingstittel, email, passord, testId } = input;

      const isUserRegistered = await registerUser({
        navn,
        organisasjon,
        stillingstittel,
        email,
        passord,
        testId,
      });

      if (isUserRegistered) {
        // Navigate to login page after successful registration
        navigate('/LoginUser');  
      }
    } catch (error) {
      // Handle the error based on your application's requirements
    }
  };

  return (
    <>
    <Header /> 
    <div className="main">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="credentials-form m-credentials-form">
          {Object.keys(input).map((fieldName) => {
            if (fieldName !== 'testId') { // Exclude 'testId' from the form display
              return (
                <Form.Control
                  key={fieldName}
                  autoComplete="off"
                  type={fieldName === 'passord' ? 'password' : 'text'}
                  placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}*`}
                  name={fieldName}
                  value={input[fieldName]}
                  onChange={handleChange}
                  className="credentials-input m-credentials-input"
                />
              );
            }
          })}
        </Form.Group>
        <Button type="submit" variant="primary">
          Opprett bruker
        </Button>
      </Form>
    </div>
    <Footer /> 
    </>
  );
}

export default CreateUserForm;
