// deleteUser.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../LogInTokens'); // Adjust the path based on your file structure
const User = require('../models/User'); // Import your User model

router.delete('/', verifyToken, async (req, res) => {
  try {
    // Assuming you have a User model, and the user ID is stored in req.user.id
    const userId = req.user.id;

    // Perform the deletion in the database
    await User.findByIdAndDelete(userId);

    // Send a success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
