
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// prestataire Routes

router.get('/', authenticateToken, authorizeRole(['prestataire']), commentsController.getPrestataireComments);

// client routes 


module.exports = router; 
