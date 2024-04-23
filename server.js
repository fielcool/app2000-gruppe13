require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require('cookie-parser');
const { connection1, connection2 } = require('./database');
const appMiddleware = require('./middleware');
const { verifyToken, generateToken } = require('./LogInTokens');
const deleteRoutes = require('./routes/deleteRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const updateRoutes = require('./routes/updateRoutes');
const updateIdRoutes = require('./routes/updateIdRoutes');
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
app.use('/api', loginRoutes);
app.use('/api', userRoutes);
app.use('/api', deleteRoutes);
app.use('/api', updateRoutes);
app.use('/api', updateIdRoutes);
app.use('/api', testResultRoutes); // Protect test result routes with authentication middleware

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
