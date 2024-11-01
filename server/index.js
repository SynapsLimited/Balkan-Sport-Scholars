// index.js or server.js

const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const playerRoutes = require('./routes/playerRoutes'); // Import player routes
const transferRoutes = require('./routes/transferRoutes'); // Import transfer routes
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://balkan-sport-scholars-client.vercel.app',
    ],
    credentials: true,
  })
);

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/players', playerRoutes); // Add players route
app.use('/api/transfers', transferRoutes); // Add transfers route

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
