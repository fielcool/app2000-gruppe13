// UserInfoFields.js
import React from 'react';
import { Form } from 'react-bootstrap';

function UserInfoFields({ newUserInfo, handleChange }) {
  return (
    <>
      <Form.Group>
        <Form.Label>Navn</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vennligst skriv inn navnet ditt"
          name="navn"
          value={newUserInfo.navn}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Organisasjon</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vennligst skriv inn hvilken organisasjon du tilhører"
          name="organisasjon"
          value={newUserInfo.organisasjon}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Stillingstittel</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vennligst skriv inn stillingstittelen din"
          name="stillingstittel"
          value={newUserInfo.stillingstittel}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Vennligst skriv inn ny email"
          name="email"
          value={newUserInfo.email}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Passord</Form.Label>
        <Form.Control
          type="password"
          placeholder="Vennligst skriv inn nytt passord"
          name="passord"
          value={newUserInfo.passord}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Test Id</Form.Label>
        <Form.Control
          type="TestId"
          placeholder="Legg inn test ID om du allerede har en"
          name="TestId"
          value={newUserInfo.passord}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Form.Group>
    </>
  );
}

export default UserInfoFields;
