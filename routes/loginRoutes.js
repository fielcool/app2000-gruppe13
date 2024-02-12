const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { email, passord } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            console.log('Invalid credentials: User not found');
            return res.status(401).json({ error: 'Invalid credentials mail' });
        }

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(passord, user.passord);

        if (!isPasswordValid) {
            console.log('Invalid credentials: Password mismatch');
            return res.status(401).json({ error: 'Invalid credentials password' });
        }

        // If the password is valid, generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
    }
});

module.exports = router;
