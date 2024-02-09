const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  organisasjon: { type: String, required: true },
  stillingstittel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passord: { type: String, required: true }
});

// Adding a pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('passord')) {
      return next();
    }

    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(this.passord, 10);
    this.passord = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

// Adding a method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.passord);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('users', userSchema);

module.exports = User;
