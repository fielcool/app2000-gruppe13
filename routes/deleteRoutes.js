const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { verifyToken } = require('../LogInTokens');
const userSchema = require('../models/UserModel');  
const User = mongoose.model('User', userSchema);

router.delete('/user', verifyToken, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userId = req.user.userId;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passord);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
