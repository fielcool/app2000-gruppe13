const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  Navn: String,
  Organisasjon: String,
  Stillingsnavn: String,
  Email: String,
  Passord: String

});

const User = mongoose.model('User', userSchema);

module.exports = User;
