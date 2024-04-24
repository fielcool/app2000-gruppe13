/*
const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult');
const { verifyToken } = require('../LogInTokens'); // Import verifyToken middleware

// Middleware to verify token on protected routes
router.use(verifyToken);

// Route to retrieve test results by user ID
router.get('/testResults/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find test results associated with the user ID
    const testResults = await TestResult.find({ userId });

    res.status(200).json(testResults);
  } catch (error) {
    console.error('Error retrieving test results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to associate test results with a user
router.post('/testResults/associate', async (req, res) => {
  try {
    const { userId, testId, lang, invalid, answers } = req.body;

    // Create a new test result object
    const newTestResult = new TestResult({
      userId,
      testId,
      lang,
      invalid,
      answers
    });

    // Save the test result to the database
    await newTestResult.save();

    res.status(201).json({ message: 'Test result associated with user successfully' });
  } catch (error) {
    console.error('Error associating test result with user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
*/