// app.js
// This module initializes an Express application with essential middleware configurations.
// It is designed to provide a foundation for handling HTTP requests with cross-origin resource sharing and JSON data parsing.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const express = require("express");
const cors = require("cors"); // CORS (Cross-Origin Resource Sharing) allows your server to accept requests from different domains

const app = express(); // Create an instance of the express server

// Middleware Setup
app.use(cors()); // Apply CORS middleware to enable cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies. This will parse incoming requests with JSON payloads.

// Export the configured Express app
module.exports = app;
