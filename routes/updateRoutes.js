const express = require('express');
const router = express.Router();
const { verifyToken } = require('../LogInTokens');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Update user information
router.put('/update-user-info', verifyToken, async (req, res) => {
  try {
    // Assuming the user ID is available in req.user.userId after verification
    const userId = req.user.userId;

    // Assuming the updated user information is available in req.body
    const { navn, organisasjon, stillingstittel, email, passord, confirmPassword } = req.body;

    // Fetch the current user from the database
    const currentUser = await User.findById(userId);

    // Check if the entered current password matches the stored password
    const passwordMatch = await bcrypt.compare(confirmPassword, currentUser.passord);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Current password does not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(passord, 10); // 10 is the number of salt rounds

    // If the current password matches, proceed with the update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { navn, organisasjon, stillingstittel, email, passord: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
