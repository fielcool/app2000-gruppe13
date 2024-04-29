// LogInTokens.js
// Provides JWT (JSON Web Token) utilities for generating and verifying tokens in an Express application.
// It is crucial for securing routes and authenticating user sessions.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // A strong, unique secret key should be used here

/**
 * Middleware to verify JWT tokens in HTTP requests to protected routes.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const verifyToken = (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract the token from 'Bearer <token>'
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Alternatively, check for token in cookies
    token = req.cookies.token;
  }

  // If no token is found, return an Unauthorized error
  if (!token) {
    console.error('Error: Missing token');
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  // Verify the token with the secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err || !decoded) {
      console.error('Error decoding token:', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  });
};

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object containing _id, email, and organisasjon.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
  // Define the payload to include in the JWT
  const payload = {
    userId: user._id,
    email: user.email,
    organisasjon: user.organisasjon
  };

  // Set options for the token such as its expiration
  const options = { expiresIn:'1h' }; // Token expires in 1 hour

  // Sign the JWT with the secret key and options
  const token = jwt.sign(payload, secretKey, options);
  
  return token;
};

// Export the middleware and token generation function for use elsewhere in the application
module.exports = { verifyToken, generateToken };
