// testIdRoutes.js
// Defines an Express route that handles updating a user's testId in the database.
// This module includes token verification and ObjectId validation using Mongoose.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  // Necessary for ObjectId validation
const { verifyToken } = require('../LogInTokens'); // Middleware for JWT verification
const User = require('../models/UserModel'); // UserModel to interact with MongoDB

// PUT route to update the user's testId in the database
router.put('/updateTestId', verifyToken, async (req, res) => {
  try {
    const { resultatId } = req.body; // Extract resultatId from request body
    const userId = req.user.userId; // Assume the user ID is provided by token verification

    // Validate the format of resultatId using Mongoose's ObjectId type
    if (!mongoose.Types.ObjectId.isValid(resultatId)) {
      return res.status(400).json({ error: 'Invalid ID format for resultatId' });
    }

    console.log('Received testId:', resultatId);
    console.log('Updating testId for user:', userId);

    // Update the user's testId in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resultatId },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      console.log('No user found with the provided userId.');
      return res.status(404).json({ message: 'No user found' });
    }

    // Log success and return the updated user information
    console.log('TestId updated successfully', updatedUser);
    res.status(200).json({ message: 'resultatId updated successfully', user: updatedUser });
  } catch (error) {
    // Log any errors and return a server error status
    console.error('Error updating resultatId:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
