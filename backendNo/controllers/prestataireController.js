const { getAllPrestataire, createPrestataire, deletePrestataire } = require('../models/prestataireModel');
const prestataireModel = require('../models/prestataireModel');

// Controller function to get all users
function getAllPrestataire(req, res) {
  prestataireModel.getAllPrestataire((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users', error: err });
    }
    res.status(200).json({ users });
  });
}

// Controller function to get a user by ID
function getPrestataireById(req, res) {
  const userId = req.params.id;
  
  prestataireModel.getPrestataireById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user by ID', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  });
}

// Controller function to create a new user
function createPrestataire(req, res) {
  const userData = req.body;

  prestataireModel.createPrestataire(userData, (err, userId) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user', error: err });
    }
    res.status(201).json({ message: 'User created successfully', userId });
  });
}

// Controller function to update a user
function updatePrestataire(req, res) {
  const userId = req.params.id;
  const userData = req.body;

  prestataireModel.updatePrestataire(userId, userData, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating user', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
}

// Controller function to delete a user
function deletePrestataire(req, res) {
  const userId = req.params.id;

  prestataireModel.deletePrestataire(userId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
}

module.exports = {
  getAllPrestataire,
  getPrestataireById,
  createPrestataire,
  updatePrestataire,
  deletePrestataire,
};
