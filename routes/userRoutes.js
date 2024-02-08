// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { Navn , Email, Passord, Organisasjon, Stillingstittel } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(Passord, 10);

    // Create a new user
    const newUser = new User({
      Navn,
      Organisasjon,
      Stillingstittel,
      Email,
      Passord: hashedPassword,
      // Add other fields as needed
    });
    console.log('Server response:', response.data);
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
  }
});

module.exports = router;
