const express = require('express');
const router = express.Router();
const authController = require('../controllers/signuppresController');

// Route pour l'inscription du prestataire
router.post('/signup', authController.signupHandler);

module.exports = router;
