const express = require('express');
const router = express.Router();
const { verifyToken } = require('../LogInTokens');
const User = require('../models/UserModel');

// Route to update the user's testId
router.put('/updateTestId', verifyToken, async (req, res) => {
  try {
    const { testId } = req.body;
    const userId = req.user._id; // Assuming the user ID is available in the request object

    console.log('Received testId:', testId);
    console.log('Updating testId for user:', userId);

    // Update the user's testId
    await User.findByIdAndUpdate(userId, { testId });

    console.log('TestId updated successfully');

    res.status(200).json({ message: 'TestId updated successfully' });
  } catch (error) {
    console.error('Error updating testId:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
