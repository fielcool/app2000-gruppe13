const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  navn: { type: String, required: true},
  organisasjon: { type: String, required: true},
  stillingstittel: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  passord: { type: String, required: true }

});

const User = mongoose.model('users', userSchema);

module.exports = User;
