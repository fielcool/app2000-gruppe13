import React from 'react';
import { Form, Alert } from 'react-bootstrap';

function UserInfoFields({ newUserInfo, handleChange }) {
  const password = newUserInfo.passord;
  const minLength = 2;

  return (
    <>
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


{// navn er ikke påkrevd, hvis folk vil være anonyme}
}

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

      {newUserInfo.organisasjon.length === 0 && (
        <Alert variant="danger">Organisasjon is required.</Alert>
      )}

      {/* Stillingstittel */}
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

      {newUserInfo.stillingstittel.length === 0 && (
        <Alert variant="danger">Stillingstittel is required.</Alert>
      )}

      {/* Email */}
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

      {(!newUserInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserInfo.email)) && (
        <Alert variant="danger">Email is invalid.</Alert>
      )}

      {/* Passord */}
      <Form.Group>
        <Form.Label>Passord</Form.Label>
        <Form.Control
          type="password"
          name="passord"
          value={newUserInfo.passord}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          minLength={minLength} // Minimum password length
          required
        />
        {password.length < minLength && (
          <Alert variant="danger">The password must be minimum {minLength} characters long.</Alert>
        )}
      </Form.Group>
    </>
  );
}

export default UserInfoFields;
