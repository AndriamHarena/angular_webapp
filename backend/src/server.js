const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Initialize express app
const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable CORS for Angular app
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the user authentication API.' });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Headers:`, req.headers.authorization ? 'Token present' : 'No token');
  next();
});

// Set up routes
console.log('Setting up routes...');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
console.log('Routes configured: /api/auth and /api/users');

// Add a test route to verify users endpoint
app.get('/api/users/test', (req, res) => {
  res.json({ message: 'Users endpoint is working' });
});

// Set port, listen for requests
const PORT = process.env.PORT || 3000;

// Sync database (create tables if they don't exist)
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
