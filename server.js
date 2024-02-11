require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');

const { verifyToken, generateToken } = require('./LogInTokens');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const port = process.env.PORT || 8080;

process.on("uncaughtException", function (err) {
  console.log(err);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"));

app.post('/api/createUser', async (req, res, next) => {
  next();
});
// Token verification middleware for protected routes
app.use('/api', verifyToken);

// Your existing routes
app.use('/api', loginRoutes, userRoutes);

// Login route
app.post('/api/login', (req, res) => {
  // Authenticate user, generate a token, and send it back in the response cookie
  const user = { id: 1, username: 'example' };
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).sendStatus(200);
});

// Database connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

// For production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server
app.listen(port, function () {
  console.log("Express server launched...");
});
