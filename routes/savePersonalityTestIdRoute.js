const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/savePersonalityTestId", async (req, res) => {
  const { testId } = req.body;
  const userId = req.user.userId; // Assuming you have user ID in the authentication token

  try {
    // Find the user by ID and update the personalityTestId field
    await User.findByIdAndUpdate(userId, { personalityTestId: testId });

    // Optionally, update the organization's users as well if needed

    res.status(200).send("Personality test ID saved successfully");
  } catch (error) {
    console.error("Error saving personality test ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
