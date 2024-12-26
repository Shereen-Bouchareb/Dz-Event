
const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');



// prestataire Routes
router.get('/', authenticateToken, authorizeRole(['prestataire']), availabilityController.getPrestataireAvailability);//only status=available
router.post('/', authenticateToken, authorizeRole(['prestataire']), availabilityController.addPrestataireAvailability);
router.delete('/' ,authenticateToken, authorizeRole(['prestataire']), availabilityController.deletePrestataireAvailability);



module.exports = router; 
