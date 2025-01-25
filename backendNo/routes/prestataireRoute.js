const express = require('express');
const prestataireController = require('../controllers/prestataireController');
const router = express.Router();

// Define routes
router.get('/prestataires', prestataireController.getAllPrestataires);
router.get('/prestataires/:id', prestataireController.getPrestataireById);
// les autres route


module.exports = router;
