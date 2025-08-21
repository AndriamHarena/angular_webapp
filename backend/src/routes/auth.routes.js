const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Update user profile (protected route)
router.put('/profile', authMiddleware.verifyToken, authController.updateProfile);

// Delete user account (protected route)
router.delete('/profile', authMiddleware.verifyToken, authController.deleteAccount);

module.exports = router;
