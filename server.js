require("dotenv").config();
const path = require("path");
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // If using MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (if applicable)
// Replace 'your-mongodb-uri' with your actual MongoDB URI
// You may use a package like dotenv to manage environment variables.
// const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse incoming JSON data
app.use(express.json());

// API routes (example)
app.get('/api/example', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Serve static assets if in production (React app)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
