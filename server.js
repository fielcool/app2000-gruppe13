require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { verifyToken, generateToken } = require('./LogInTokens');
const deleteRoutes = require('./routes/deleteRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const updateRoutes = require('./routes/updateRoutes');
const testResultRoutes = require('./routes/testResultRoutes'); // Import test result routes
const port = process.env.PORT || 8080;

process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit the process on uncaught exceptions
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Routes
app.use('/api', loginRoutes, userRoutes, deleteRoutes, updateRoutes);
app.use('/api', verifyToken, testResultRoutes); // Protect test result routes with authentication middleware

// Login route
app.post('/api/login', (req, res) => {
  // Authenticate user, generate a token, and send it back in the response cookie
  const user = { id: 1, username: 'example' };
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).sendStatus(200);
});

// DELETE route for deleting a user account
app.delete('/api/user', verifyToken, deleteRoutes);

// Database connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose
  .connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit the process on MongoDB connection error
  });

// For production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server
app.listen(port, function () {
  console.log("Express server launched...");
});
