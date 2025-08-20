const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ 
        success: false,
        message: "Tous les champs sont requis" 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Un utilisateur avec cet email existe déjà" 
      });
    }
    
    // Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    // Create new user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
      { expiresIn: 86400 } // 24 hours
    );
    
    // Return user information and token
    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while registering the user" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ 
        success: false,
        message: "Email et mot de passe requis" 
      });
    }
    
    // Find user by email
    const user = await User.findOne({ where: { email: req.body.email } });
    
    // Check if user exists and validate password
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ 
        success: false,
        message: "Email ou mot de passe incorrect" 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
      { expiresIn: 86400 } // 24 hours
    );
    
    // Return user information and token
    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while logging in" });
  }
};
