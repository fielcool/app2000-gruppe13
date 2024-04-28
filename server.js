// server.js
// This file sets up an Express application server, configures middleware, routes, and error handling.
// It is the entry point for running the application server.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const path = require("path");
const appMiddleware = require('./middleware'); // Import the app object configured with middleware from middleware.js
const { verifyToken } = require('./LogInTokens'); // JWT verification utility
const deleteRoutes = require('./routes/deleteRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const updateRoutes = require('./routes/updateRoutes');
const updateIdRoutes = require('./routes/updateIdRoutes');
const crossReferenceRoutes = require('./routes/crossReferenceRoutes');
// const testResultRoutes = require('./routes/testResultRoutes'); // Uncomment to include test result handling routes

const port = process.env.PORT || 8080; // Define the port to run the server on

// Handle uncaught exceptions globally
process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit the process on uncaught exceptions to avoid undefined server state
});

// Configure routes
appMiddleware.use('/api', loginRoutes, userRoutes, deleteRoutes, updateRoutes);
appMiddleware.use('/api', updateIdRoutes);
appMiddleware.use('/api', crossReferenceRoutes);
appMiddleware.use('/api', verifyToken, deleteRoutes); // This seems incorrect and might be a typo. It's likely meant to configure middleware or specific route handling.

// Static files configuration for production
if (process.env.NODE_ENV === "production") {
  appMiddleware.use(express.static("client/build")); // Serve static files from the React build directory
  appMiddleware.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // Handle React routing, return the main index.html
  });
}

// Error handling middleware
appMiddleware.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: 'Internal Server Error' }); // Return a generic error message with status code 500
});

// Start the server
appMiddleware.listen(port, function () {
  console.log("Express server launched on port", port); // Log server start status
});
