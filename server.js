// app.js or server.js
import express from 'express';
import userRoute from './routes/userRoute';
import mongoose from './db'; // Assuming db.js is in the same directory

const app = express();
const PORT = process.env.PORT || 3000;

// Use middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the userRoute for user-related routes
app.use('/user', userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
