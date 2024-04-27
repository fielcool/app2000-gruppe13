const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  // Import mongoose to use ObjectId
const { verifyToken } = require('../LogInTokens');
const User = require('../models/UserModel');

// Route to update the user's testId
router.put('/updateTestId', verifyToken, async (req, res) => {
  try {
    const { resultatId } = req.body;
    const userId = req.user.userId; // Assuming the user ID is available in the request object

    // Validate the format of resultatId
    if (!mongoose.Types.ObjectId.isValid(resultatId)) {
      return res.status(400).json({ error: 'Invalid ID format for resultatId' });
    }

    console.log('Received testId:', resultatId);
    console.log('Updating testId for user:', userId);

    // Update the user's testId
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resultatId },
      { new: true }
    );

    if (!updatedUser) {
      console.log('No user found with the provided userId.');
      return res.status(404).json({ message: 'No user found' });
    }

    console.log('TestId updated successfully', updatedUser);
    res.status(200).json({ message: 'resultatId updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating resultatId:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
