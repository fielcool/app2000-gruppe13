// loginRoutes.js
// Defines the login route for the application using Express. This module handles user authentication,
// including validating credentials and generating a JWT for authorized users.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing comparison
const User = require('../models/UserModel'); // UserModel to interact with the MongoDB users collection
const { generateToken } = require('../LogInTokens'); // Function to generate JWT for authenticated users

// POST endpoint for user login
router.post('/login', async (req, res) => {
    try {
        const { email, passord } = req.body; // Destructure email and password from request body
        const user = await User.findOne({ email }); // Find user by email

        if (!user) {
            // If no user is found with the provided email, return an error
            console.log('Invalid login credentials: User not found');
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const isPasswordValid = await bcrypt.compare(passord, user.passord); // Compare provided password with the hashed password in the database
        if (!isPasswordValid) {
            // If password comparison fails, return an error
            console.log('Invalid login credentials: Incorrect password');
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const token = generateToken(user); // Generate a JWT token for the authenticated user

        // Send the JWT token to the client as a response
        res.status(200).json({ token });
    } catch (error) {
        // Log and respond with error details if an exception occurs during the login process
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message, stack: error.stack });
    }
});

module.exports = router;
