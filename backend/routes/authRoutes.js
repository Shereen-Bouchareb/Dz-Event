// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importing the auth controller

// Signup routes
router.post('/signup/prestataire', authController.signupPrestataire);  // For Prestataire signup
router.post('/signup/client', authController.signupClient);          // For Client signup

router.post('/login', authController.login);  // For Login (both Prestataire and Client)

module.exports = router;  // Exporting the router to be used in app.js
