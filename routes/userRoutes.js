const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userSchema = require('../models/UserModel');
const loginRoutes = require('./loginRoutes');
const User = mongoose.model('User', userSchema);

router.use('/login', loginRoutes);

router.post('/createUser', async (req, res) => {
  try {
    const { navn, email, passord, organisasjon, stillingstittel, resultatId } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(passord, 10);
    const newUser = new User({
      navn,
      email,
      passord: hashedPassword,
      organisasjon,
      stillingstittel,
      resultatId
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
  }
});

module.exports = router;
