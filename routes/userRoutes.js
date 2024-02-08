// routes/userRoute.js
import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/register', (req, res) => {
  // Render the Register component
  res.send(<Register />);
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user instance using the User model
    const newUser = new User({ email, password });

    // Save the user to the MongoDB database
    await newUser.save();

    // Send a success response
    res.send(`User registered successfully: ${email}`);
  } catch (error) {
    console.error(error);
    // Send an error response
    res.status(500).send('Internal Server Error');
  }
});

export default router;
