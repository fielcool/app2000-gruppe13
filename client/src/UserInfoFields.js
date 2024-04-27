import React from 'react';
import { Form } from 'react-bootstrap';

function UserInfoFields({ newUserInfo, handleChange }) {
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

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={newUserInfo.email}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          maxLength={50} 
          required 
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Passord</Form.Label>
        <Form.Control
          type="password"
          name="passord"
          value={newUserInfo.passord}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          minLength={2} // valgte 2 som minimum antall tegn på passord pga jeg må lage testprofiler.
          required 
        />
      </Form.Group>
    </>
  );
}

export default UserInfoFields;
