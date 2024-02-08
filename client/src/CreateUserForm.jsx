import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function CreateUserForm() {
  const [input, setInput] = useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', input);
    if (Object.values(input).some((value) => value === "")) {
      // Show modal alert or handle the empty fields case as needed
      return;
    }

    try {
      const { Navn, Organisasjon, Stillingstittel, Email, Passord } = input;

      // Assuming you have a function to handle MongoDB update on the client side
      // updateDataInMongoDB(input);

      // Send user registration data to the server
      const response = await axios.post('/', {
        Navn,
        Organisasjon,
        Stillingstittel,
        Email,
        Passord,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },});

      if (response.status === 201) {
        console.log("User registered successfully");
        // Optionally, you can reset the form after updating MongoDB
        setInput({
          Navn: "",
          Organisasjon: "",
          Stillingstittel: "",
          Email: "",
          Passord: "",
        });
      } else {
        console.log('Server response:', response.data);
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  return (
    <div className="main">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="credentials-form m-credentials-form">
          {Object.keys(input).map((fieldName) => (
            <Form.Control
              key={fieldName}
              autoComplete="off"
              type="text"
              placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}*`}
              name={fieldName}
              value={input[fieldName]}
              onChange={handleChange}
              className="credentials-input m-credentials-input"
            />
          ))}
        </Form.Group>
        <Button type="submit" variant="primary">
          opprett bruker
        </Button>
      </Form>
    </div>
  );
}

export default CreateUserForm;
