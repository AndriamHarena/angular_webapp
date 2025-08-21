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

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const { name, email, currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        success: false,
        message: "Le nom et l'email sont requis" 
      });
    }

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Utilisateur non trouvé" 
      });
    }

    // Check if email is being changed and if it's already taken
    if (email !== user.email) {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(409).json({ 
          success: false,
          message: "Cet email est déjà utilisé par un autre compte" 
        });
      }
    }

    // Prepare update data
    const updateData = {
      name: name,
      email: email
    };

    // Handle password change if requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ 
          success: false,
          message: "Le mot de passe actuel est requis pour changer le mot de passe" 
        });
      }

      // Verify current password
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        return res.status(401).json({ 
          success: false,
          message: "Mot de passe actuel incorrect" 
        });
      }

      // Validate new password length
      if (newPassword.length < 6) {
        return res.status(400).json({ 
          success: false,
          message: "Le nouveau mot de passe doit contenir au moins 6 caractères" 
        });
      }

      // Hash new password
      updateData.password = bcrypt.hashSync(newPassword, 8);
    }

    // Update user
    await User.update(updateData, { where: { id: userId } });

    // Return updated user information
    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: {
        id: user.id,
        name: updateData.name,
        email: updateData.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || "Erreur lors de la mise à jour du profil" 
    });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Utilisateur non trouvé" 
      });
    }

    // Delete the user
    await User.destroy({ where: { id: userId } });

    // Return success message
    res.status(200).json({
      success: true,
      message: 'Compte supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || "Erreur lors de la suppression du compte" 
    });
  }
};
