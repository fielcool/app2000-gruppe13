const mongoose = require('mongoose');
const { connection1 } = require('../database'); // Import the database connection
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  organisasjon: { type: String, required: true },
  stillingstittel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passord: { type: String, required: true },
  testId: { type: String } 
});

// Adding a method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.passord);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
  }
};

// Create the User model using connection1
const User = connection1.model('User', userSchema, 'users');

module.exports = User;
