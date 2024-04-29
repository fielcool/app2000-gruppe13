// UserInfoFields.js
// This component renders input fields for user information within a form context. It validates the input and provides feedback.
// It supports inputs for name, organization, job title, email, and password with appropriate validation.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from 'react';
import { Form, Alert } from 'react-bootstrap';

function UserInfoFields({ newUserInfo, handleChange }) {
  const password = newUserInfo.passord;
  const minLength = 2; // Minimum length for the password field

  return (
    <>
      {/* Name input field, not required to allow anonymity */}
      <Form.Group>
        <Form.Label>Navn</Form.Label>
        <Form.Control
          type="text"
          name="navn"
          value={newUserInfo.navn}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          maxLength={50}
          required
        />
      </Form.Group>

      {/* Organization input field */}
      <Form.Group>
        <Form.Label>Organisasjon</Form.Label>
        <Form.Control
          type="text"
          name="organisasjon"
          value={newUserInfo.organisasjon}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          maxLength={50}
          required
        />
      </Form.Group>

      {/* Alert if organization field is empty */}
      {newUserInfo.organisasjon.length === 0 && (
        <Alert variant="danger">Organisasjon er påkrevd.</Alert>
      )}

      {/* Job title input field */}
      <Form.Group>
        <Form.Label>Stillingstittel</Form.Label>
        <Form.Control
          type="text"
          name="stillingstittel"
          value={newUserInfo.stillingstittel}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          maxLength={50}
          required
        />
      </Form.Group>

      {/* Alert if job title field is empty */}
      {newUserInfo.stillingstittel.length === 0 && (
        <Alert variant="danger">Stillingstittel er påkrevd.</Alert>
      )}

      {/* Email input field with pattern validation */}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={newUserInfo.email}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          maxLength={50}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      </Form.Group>

      {/* Alert for invalid email format */}
      {(!newUserInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserInfo.email)) && (
        <Alert variant="danger">Email ikke godkjent.</Alert>
      )}

      {/* Password input field with length validation */}
      <Form.Group>
        <Form.Label>Passord</Form.Label>
        <Form.Control
          type="password"
          name="passord"
          value={newUserInfo.passord}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          minLength={minLength} // Enforce minimum password length
          required
        />
        {password.length < minLength && (
          <Alert variant="danger">Passordet må være på minst {minLength} tegn.</Alert>
        )}
      </Form.Group>
    </>
  );
}

export default UserInfoFields;
