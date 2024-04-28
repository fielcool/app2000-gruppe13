// userRoutes.js
// This module defines the Express router for user-related operations, such as registration.
// It includes secure password hashing and user creation with validation against existing records.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');  // Library for hashing passwords securely
const User = require('../models/UserModel');  // User model to interact with the database
const loginRoutes = require('./loginRoutes');  // Importing the login routes to be used with this router

// Use login routes under the '/login' path
router.use('/login', loginRoutes);

// POST endpoint to create a new user
router.post('/createUser', async (req, res) => {
  try {
    // Extracting user details from the request body
    const { navn, email, passord, organisasjon, stillingstittel, resultatId } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      // If a user exists, return an error
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password using bcrypt with 10 rounds of salting
    const hashedPassword = await bcrypt.hash(passord, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({
      navn,
      organisasjon,
      stillingstittel,
      email,
      passord: hashedPassword,
      resultatId,
      // Additional fields can be added here as required
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success if the user is registered without issues
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Log and respond with error details if an exception occurs
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
  }
});

module.exports = router;
