const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the user schema
const userSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  organisasjon: { type: String, required: true },
  stillingstittel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passord: { type: String, required: true },
  resultatId: { type: String } 
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

// Export the user schema
module.exports = userSchema;
