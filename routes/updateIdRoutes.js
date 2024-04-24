const express = require('express');
const router = express.Router();
const { verifyToken } = require('../LogInTokens');
const User = require('../models/UserModel');

// Route to update the user's testId
router.put('/updateTestId', verifyToken, async (req, res) => {
  try {
    const { resultatId } = req.body;
    const userId = req.user.userId; // Assuming the user ID is available in the request object

    console.log('Received testId:', resultatId);
    console.log('Updating testId for user:', userId);

    // Update the user's testId
    await User.findByIdAndUpdate(userId, { resultatId },
    {new: true});

    console.log('TestId updated successfully');

    res.status(200).json({ message: 'resultatId updated successfully' });
  } catch (error) {
    console.error('Error updating resultatId:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
