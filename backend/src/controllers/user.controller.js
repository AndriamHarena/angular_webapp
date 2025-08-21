const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] } // Exclude the password from the response
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while retrieving user profile" });
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
