const mongoose = require('mongoose');

// Replace 'your_connection_string' with your actual MongoDB connection string
const uri = MONGODB_URI;

// Optional: Mongoose configuration options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Additional options if needed
};

// Establish the MongoDB connection
mongoose.connect(uri, mongooseOptions);

const db = mongoose.connection;

// Event listeners for connection status
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!');
});

// Export the Mongoose connection
module.exports = mongoose;
