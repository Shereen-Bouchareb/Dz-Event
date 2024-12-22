const mysql = require('mysql2');
const connection = require('../config/db'); // Database connection from config

// Function to get all users
function getAllPrestataire(callback) {
  const query = 'SELECT * FROM Prestataire';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
}

// Function to get a user by ID
function getPrestataireById(userId, callback) {
  const query = 'SELECT * FROM users WHERE id = ?';
  const values = [userId];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching user by ID:', err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
}

// Function to create a new user
function createPrestataire(userData, callback) {
    //TODO: MODIFICATION DES INFO 
  const query = 'INSERT INTO users (first_name, last_name, email, created_at) VALUES (?, ?, ?, ?)';
  const values = [userData.first_name, userData.last_name, userData.email, new Date()];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return callback(err, null);
    }
    callback(null, result.insertId); // return the ID of the new user
  });
}

// Function to update a user
function updatePrestataire(userId, userData, callback) {
    //TODO: MODIFICATION DES INFO 
  const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?';
  const values = [userData.first_name, userData.last_name, userData.email, userId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return callback(err, null);
    }
    callback(null, result.affectedRows); // return how many rows were affected
  });
}

// Function to delete a user
function deletePrestataire(userId, callback) {
  const query = 'DELETE FROM users WHERE id = ?';
  const values = [userId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return callback(err, null);
    }
    callback(null, result.affectedRows); // return how many rows were affected
  });
}

module.exports = {
  getAllPrestataire,
  getPrestataireById,
  createPrestataire,
  updatePrestataire,
  deletePrestataire,
};
