// userRoutes.js
// This module defines a router for handling user-related operations in an Express application, specifically deleting a user account.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const { verifyToken } = require('../LogInTokens'); // Middleware to verify JWT token
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); // Import the User model

// DELETE route for deleting a user account
router.delete('/user', verifyToken, async (req, res) => {
  try {
    console.log('Incoming headers:', req.headers);

    // Check if user data from token is available and has userId
    if (!req.user || !req.user.userId) {
      throw new Error('User information not available');
    }

    // Extract the user ID from the decoded JWT token
    const userId = req.user.userId;

    // Get the password from the request body to confirm user identity
    const { password } = req.body;
    console.log('Entered password:', password);

    // Retrieve the user document from the database using the userID
    const user = await User.findById(userId);

    // If the user document is not found, send a 404 error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the one stored in the database
    const isPasswordValid = await user.comparePassword(password);
    console.log('Is password valid:', isPasswordValid);

    // If the password is invalid, respond with a 401 Unauthorized error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If password verification is successful, delete the user account
    await User.findByIdAndDelete(userId);

    // Send a success response confirming the deletion of the account
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    // Log and return an error if an exception occurs
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
