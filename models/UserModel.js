const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { connection1 } = require('../server');

// Get the connection for the brukere database from server.js
const connection = mongoose.connections.find(connection => connection === connection1);

const userSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  organisasjon: { type: String, required: true },
  stillingstittel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passord: { type: String, required: true }
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

const User = connection1.model('users', userSchema, 'users');

module.exports = User;
