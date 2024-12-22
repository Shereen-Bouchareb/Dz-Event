const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/signupuserController');

// Route pour l'inscription
router.post('/signup', signUp);

module.exports = router;
