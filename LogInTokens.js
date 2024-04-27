const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; // Replace with a strong, unique secret key

// Middleware to verify the token on protected routes
const verifyToken = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract the token from the Authorization header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // If there's no Authorization header, check if the token is in cookies
    token = req.cookies.token;
  }

  if (!token) {
    console.error('Error: Missing token');
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err || !decoded) {
      console.error('Error decoding token:', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    console.log('Decoded token:', decoded); // Log the entire decoded token

    req.user = decoded; // Attach the user information to the request

    next();
  });
};

// Token generation
const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    organisasjon: user.organisasjon
  };
  const options = { expiresIn:'1h' };
  const token = jwt.sign(payload, secretKey, options);

  // Debugging: Decode token immediately to verify content
  const decoded = jwt.decode(token); // Decode token to verify its content
  console.log("Decoded token immediately after generation:", decoded);

  return token;
};

// Export the functions for use in other files
module.exports = { verifyToken, generateToken };
