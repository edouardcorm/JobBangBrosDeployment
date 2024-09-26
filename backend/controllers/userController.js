require('dotenv').config();
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Inscription d'un utilisateur
const signupUser = async (req, res) => {
  const { name, gender, email, password } = req.body;

  if (!name || !gender || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({ name, gender, email, password: hashedPassword });

    // Create a token
    const token = createToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Récupérer tous les utilisateurs non-admin
const getAllNonAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ admin: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par son id
const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, profile_pictures, description, job, tags, age, preference } = req.body;

  // Check if email is provided and is a valid email
  if (email && !validator.isEmail(email)) {
    return res.status(400).send('Email invalide');
  }

  // Hash the password if it is provided
  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedUser = { 
    name, 
    email, 
    password: hashedPassword, 
    profile_pictures, 
    description, 
    job, 
    tags, 
    age,
    preference,
    _id: id 
  };

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    if (!user) {
      return res.status(404).send('Aucun utilisateur avec cet id');
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).send('Erreur de mise à jour de l\'utilisateur');
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Aucun utilisateur avec cet id');

  const user = await User.findByIdAndDelete(id);

  if (!user) {
      return res.status(404).send('Aucun utilisateur avec cet id');
  } else {
      return res.status(200).send('Utilisateur supprimé avec succès');
  }
};


module.exports = {
  getAllNonAdminUsers,
  getUserbyId,
  updateUser,
  deleteUser,
  signupUser,
  loginUser
};