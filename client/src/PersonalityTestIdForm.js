import React, { useState } from "react";
import axios from "axios";

function PersonalityTestIdForm({ authToken }) {
  const [resultatId, setTestId] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(true); // State to track if the format is valid

  const handleTestIdChange = (e) => {
    const inputValue = e.target.value;
    setTestId(inputValue);

    // Validate the input format using regular expressions
    const isValid = /^[0-9a-fA-F]{24}$/.test(inputValue);
    setIsValidFormat(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidFormat) {
      alert("Feil ID format! Vennligst sjekk at riktig ID er kopiert og limt inn"); // Display an alert if the format is invalid
      return;
    }

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
        className={`wider-input ${isValidFormat ? '' : 'invalid-format'}`} //Red text if the input doesn't match object id format.
      />
      <button type="submit" className="btn btn-info btn-md fp-button shadow-custom">Lagre test-ID</button>
    </form>
  );
}

export default PersonalityTestIdForm;
