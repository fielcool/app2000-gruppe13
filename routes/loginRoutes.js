const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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

        // Logging for debugging
        console.log('Entered Password:', passord);
        console.log('Stored Hashed Password:', user.passord);

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(passord, user.passord);

        // Logging for debugging
        console.log('Is password valid?', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Invalid credentials: Password mismatch');
            return res.status(401).json({ error: 'Invalid credentials password' });
        }

        // If the password is valid, you can generate a token and send it to the client for authentication
        // For simplicity, let's just send a success message for now
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
    }
});

module.exports = router;
