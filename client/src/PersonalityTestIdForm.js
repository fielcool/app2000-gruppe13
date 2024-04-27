import React, { useState } from "react";
import axios from "axios";

function PersonalityTestIdForm({ authToken }) {
  const [resultatId, setTestId] = useState("");

  const handleTestIdChange = (e) => {
    setTestId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit}className="id-input">
      <input 
        type="text"
        value={resultatId}
        onChange={handleTestIdChange}
        placeholder="Lim inn ID fra personlighetstesten"
        className="wider-input"
      />
      <button type="submit" className="btn btn-info btn-md fp-button shadow-custom">Lagre test-ID</button>
    </form>
  );
}

export default PersonalityTestIdForm;
