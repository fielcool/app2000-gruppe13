// userUpdateRoutes.js
// This Express router handles updating user profile information, including secure password updates.
// The route uses token verification to ensure only authenticated users can update their information.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../LogInTokens'); // Middleware for token verification
const User = require('../models/UserModel'); // User model for database interaction
const bcrypt = require('bcrypt'); // bcrypt library for password hashing

// PUT endpoint for updating user information
router.put('/update-user-info', verifyToken, async (req, res) => {
  try {
    // Retrieve the user ID from the decoded JWT token provided by the verifyToken middleware
    const userId = req.user.userId;

    // Retrieve updated user information from the request body
    const { navn, organisasjon, stillingstittel, email, passord, confirmPassword } = req.body;

    // Fetch the current user from the database
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify the current password with the one stored in the database
    const passwordMatch = await bcrypt.compare(confirmPassword, currentUser.passord);
    if (!passwordMatch) {
      // Respond with an error if the current password does not match
      return res.status(401).json({ error: 'Current password does not match' });
    }

    // Hash the new password with bcrypt before storing it
    const hashedPassword = await bcrypt.hash(passord, 10); // Using 10 rounds of salting

    // Update user information in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { navn, organisasjon, stillingstittel, email, passord: hashedPassword },
      { new: true } // Option to return the updated document
    );

    // Check if the update was successful
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the updated user information
    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.toString() });
  }
});

module.exports = router;
