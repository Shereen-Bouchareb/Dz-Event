
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// prestataire Routes

router.get('/', authenticateToken, authorizeRole(['prestataire']), profileController.getPrestatairePictures);
router.post('/', authenticateToken, authorizeRole(['prestataire']), profileController.addPrestatairePicture);
router.put('/', authenticateToken, authorizeRole(['prestataire']), profileController.editPrestataireProfile);



// client routes 


module.exports = router;  // Exporting the router to be used in app.js
