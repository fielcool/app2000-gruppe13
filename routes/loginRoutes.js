const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { generateToken } = require('../LogInTokens');


router.post('/login', async (req, res) => {
    try {
        const { email, passord } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid login credentials: User not found');
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const isPasswordValid = await bcrypt.compare(passord, user.passord);
        if (!isPasswordValid) {
            console.log('Invalid login credentials: Incorrect password');
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        // Use the generateToken function
        const token = generateToken(user);

        // Send the token to the client
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message, stack: error.stack });
    }
});


module.exports = router;
