const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ 
        success: false,
        message: "Tous les champs sont requis" 
      });
    }
    
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Un utilisateur avec cet email existe déjà" 
      });
    }
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
      { expiresIn: 86400 }
    );
    
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

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ 
        success: false,
        message: "Email et mot de passe requis" 
      });
    }
    
    const user = await User.findOne({ where: { email: req.body.email } });
    
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ 
        success: false,
        message: "Email ou mot de passe incorrect" 
      });
    }
    
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
      { expiresIn: 86400 }
    );
    
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

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, currentPassword, newPassword } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false,
        message: "Le nom et l'email sont requis" 
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Utilisateur non trouvé" 
      });
    }

    if (email !== user.email) {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(409).json({ 
          success: false,
          message: "Cet email est déjà utilisé par un autre compte" 
        });
      }
    }

    const updateData = {
      name: name,
      email: email
    };

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ 
          success: false,
          message: "Le mot de passe actuel est requis pour changer le mot de passe" 
        });
      }

      if (!bcrypt.compareSync(currentPassword, user.password)) {
        return res.status(401).json({ 
          success: false,
          message: "Mot de passe actuel incorrect" 
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ 
          success: false,
          message: "Le nouveau mot de passe doit contenir au moins 6 caractères" 
        });
      }

      updateData.password = bcrypt.hashSync(newPassword, 8);
    }

    await User.update(updateData, { where: { id: userId } });

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

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Utilisateur non trouvé" 
      });
    }

    await User.destroy({ where: { id: userId } });

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
