// In your server file (e.g., server.js or routes file)
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
      const { passord, ...updatedUserInfo } = req.body;
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(passord, 10); // 10 is the number of salt rounds
  
      // Add the hashed password to the updated user information
      updatedUserInfo.passord = hashedPassword;
  
      // Perform the update in the database
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
  
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
