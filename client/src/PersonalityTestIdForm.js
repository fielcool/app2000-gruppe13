// PersonalityTestIdForm.js
// This component allows users to enter and submit a personality test ID for validation and saving.
// It checks if the entered ID follows a specific format (24 hexadecimal characters) before submitting.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { useState } from "react";
import axios from "axios";

function PersonalityTestIdForm({ authToken }) {
  const [resultatId, setTestId] = useState(""); // State for storing the test ID entered by the user
  const [isValidFormat, setIsValidFormat] = useState(true); // State to track if the format is valid

  // Handles changes to the test ID input and validates its format
  const handleTestIdChange = (e) => {
    const inputValue = e.target.value;
    setTestId(inputValue);

    // Validate the input format using regular expressions for a 24-character hexadecimal string
    const isValid = /^[0-9a-fA-F]{24}$/.test(inputValue);
    setIsValidFormat(isValid);
  };

  // Handles the form submission for saving the test ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidFormat) {
      // Alert the user if the format of the test ID is invalid
      alert("Feil ID format! Vennligst sjekk at riktig ID er kopiert og limt inn");
      return;
    }

    // Send the valid ID to the server using a PUT request
    try {
      console.log("Sending request to save personality test ID...");
      await axios.put(
        "/api/updateTestId", 
        { resultatId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Personality test ID saved successfully");
    } catch (error) {
      console.error("Error saving personality test ID:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="id-input">
      <input 
        type="text"
        value={resultatId}
        onChange={handleTestIdChange}
        placeholder="Lim inn ID fra personlighetstesten"
        className={`wider-input ${isValidFormat ? '' : 'invalid-format'}`} // Apply 'invalid-format' class if ID is not valid
      />
      <button type="submit" className="btn btn-info btn-md fp-button shadow-custom">Lagre test-ID</button>
    </form>
  );
}

export default PersonalityTestIdForm;
