const express = require('express');
const prestataireController = require('../controllers/prestataireController');
const router = express.Router();

// Define routes
router.get('/', prestataireController.getAllPrestataires);
router.get('/:id', prestataireController.getPrestataireById);
router.get('/getPendingReservations', prestataireController.getPendingReservations)


module.exports = router;
