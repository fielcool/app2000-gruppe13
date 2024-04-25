const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/UserModel'); 
const User = mongoose.model('User', userSchema);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid login credentials, user not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passord);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid login credentials, incorrect password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username, organization: user.organisasjon }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
