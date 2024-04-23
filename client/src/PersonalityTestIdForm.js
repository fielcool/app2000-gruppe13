import React, { useState } from "react";
import axios from "axios";

function PersonalityTestIdForm({ authToken }) {
  const [testId, setTestId] = useState("");

  const handleTestIdChange = (e) => {
    setTestId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/savePersonalityTestId",
        { testId },
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={testId}
        onChange={handleTestIdChange}
        placeholder="Paste your personality test ID here"
      />
      <button type="submit">Save Test ID</button>
    </form>
  );
}

export default PersonalityTestIdForm;