// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.post('/createUser', async (req, res) => {
  try {
    const { navn, email, passord, organisasjon, stillingstittel } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user without hashing the password
    const newUser = new User({
      navn,
      organisasjonn,
      stillingstittel,
      email,
      passord, // Store the password as is (insecure, for demonstration purposes only)
      // Add other fields as needed
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
  }
});

module.exports = router;
