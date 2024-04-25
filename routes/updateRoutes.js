const express = require('express');
const router = express.Router();
const { verifyToken } = require('../LogInTokens');
const userSchema = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

router.put('/update-user-info', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { navn, organisasjon, stillingstittel, email, newPassword, confirmPassword } = req.body;

    if (!confirmPassword) {
      return res.status(400).json({ error: 'Current password is required' });
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(confirmPassword, currentUser.passord);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Current password does not match' });
    }

    const updateData = { navn, organisasjon, stillingstittel, email };
    if (newPassword) {
      updateData.passord = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
