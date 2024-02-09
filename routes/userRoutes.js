const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const loginRoutes = require('./loginRoutes');

router.use('/login', loginRoutes);
router.post('/createUser', async (req, res) => {
  try {
    const { navn, email, passord, organisasjon, stillingstittel } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(this.passord, 10); // 10 is the number of salt rounds

    // Create a new user with the hashed password
    const newUser = new User({
      navn,
      organisasjon,
      stillingstittel,
      email,
      passord: hashedPassword,
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
