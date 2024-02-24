const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; // Replace with a strong, unique secret key

// Middleware to verify the token on protected routes
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.error('Error: Missing token');
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error decoding token:', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded; // Attach the user information to the request
    console.log('Decoded token:', decoded); // Log the decoded token
    next();
  });
};

// Token generation
const generateToken = (user) => {
  const payload = { userId: user.id, username: user.username };
  const options = { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' };
  return jwt.sign(payload, secretKey, options);
};

// Export the functions for use in other files
module.exports = { verifyToken, generateToken };
