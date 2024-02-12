import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import LoggedInUser from "./LoggedInUser";
async function loginUser(credentials) {
  try {
    // Utfører en asynkron POST-request til "/api/login" med brukerens påloggingsinformasjon
    const response = await axios.post('/api/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Håndterer serverresponsen
    if (response.status === 200) {
      console.log("Login successful");
      // Henter autentiseringsnøkkelen (token) fra responsdataene
      const token = response.data.token;
      console.log("Received token:", token);
      return token;  // Returnerer autentiseringsnøkkelen
    } else {
      // Logger feilmelding hvis responskoden ikke er 200
      console.log('Server response:', response.data);
      console.error("Login failed - Status:", response.status);
      return null;
    }
  } catch (error) {
    // Håndterer eventuelle feil under pålogging
    console.error("Error logging in:", error);
    throw error;  // Rethrow for å la kallende kode håndtere feilen
  }
}

// LoginForm-komponenten inneholder et påloggingskjema og håndterer påloggingslogikken
function LoginForm() {
  // Tilstanden for brukerens påloggingsinformasjon
  const [credentials, setCredentials] = useState({
    email: "",
    passord: "",
  });

  // Tilstanden for å lagre autentiseringsnøkkelen (token)
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

  // Funksjon for å oppdatere tilstanden basert på endringer i inntastningsfeltene
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Håndterer påloggingsforsøket når skjemaet sendes inn
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validerer at begge inntastningsfeltene ikke er tomme
    if (Object.values(credentials).some((value) => value === "")) {
      // Vis modalvarsel eller håndter tomme felt som nødvendig
      return;
    }

    try {
      // Utfører pålogging ved å kalle loginUser-funksjonen
      const token = await loginUser(credentials);

      // Hvis påloggingen lykkes
      if (token) {
        console.log("Login successful");
        // Oppdaterer både tilstanden og lagrer autentiseringsnøkkelen i lokal lagring
        setAuthToken(token);
        localStorage.setItem('authToken', token);
      } else {
        // Logger feilmelding hvis påloggingen mislykkes
        console.error("Login failed");
      }
    } catch (error) {
      // Håndterer eventuelle feil under pålogging
      console.error("Error logging in:", error);
      // Behandler feilen basert på programmet krav
    }
  };

  // Returnerer JSX avhengig av om det er en autentiseringsnøkkel eller ikke
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