const express = require('express');
const router = express.Router();
const { protect } = require('../middleware');
const User = require('../models/UserModel');

// Update user's testId
router.put('/updateTestId', protect, async (req, res) => {
    try {
      const { testId } = req.body;
      const userId = req.user._id;
      console.log('Received Test ID:', testId);
      console.log('User ID:', userId);
  
      // Update the user's testId
      const updatedUser = await User.findByIdAndUpdate(userId, { testId }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'TestId updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating testId:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  