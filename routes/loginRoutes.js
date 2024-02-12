const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library
const User = require('../models/UserModel');

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
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        // Send the token to the client
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
    }
});

module.exports = router;
