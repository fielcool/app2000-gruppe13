const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  navn: String,
  organisasjon: String,
  stillingstittel: String,
  email: String,
  passord: String

});

const User = mongoose.model('users', userSchema);

module.exports = User;
