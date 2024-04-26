require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require('jsonwebtoken');
const appMiddleware = require('./middleware'); // Import the app object from middleware.js
const { verifyToken, generateToken } = require('./LogInTokens');
const deleteRoutes = require('./routes/deleteRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const updateRoutes = require('./routes/updateRoutes');
const updateIdRoutes = require('./routes/updateIdRoutes');
const crossReferenceRoutes = require('./routes/crossReferenceRoutes');

//const testResultRoutes = require('./routes/testResultRoutes'); // Import test result routes
const port = process.env.PORT || 8080;

process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit the process on uncaught exceptions
});

// Routes
appMiddleware.use('/api', loginRoutes, userRoutes, deleteRoutes, updateRoutes);
appMiddleware.use('/api', updateIdRoutes);
appMiddleware.use('/api', crossReferenceRoutes);
//appMiddleware.use('/api', testResultRoutes); // Protect test result routes with authentication middleware
appMiddleware.delete('/api', verifyToken, deleteRoutes);

// For production
if (process.env.NODE_ENV === "production") {
  appMiddleware.use(express.static("client/build"));
  appMiddleware.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error handling middleware
appMiddleware.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server
appMiddleware.listen(port, function () {
  console.log("Express server launched...");
});