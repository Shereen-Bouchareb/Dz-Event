
const express = require('express');
const router = express.Router();
const prestataireController = require('../controllers/prestataireController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');



// prestataire Routes


// client routes 
router.get('/', authenticateToken, authorizeRole(['client']), prestataireController.getAllPrestataire);
router.get('/:prestataireId', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireById);
router.get('/:prestataireId/comments', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireCommentsByClient);
router.post('/:prestataireId/comments', authenticateToken, authorizeRole(['client']), prestataireController.submitComment);
router.get('/:prestataireId/services', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireServicesByClient);
router.get('/:prestataireId/Gallery', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireGalleryByClient);
router.get('/:prestataireId/availability', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireAvailabilityByClient);
router.get('/:prestataireId/services/:serviceId/reservation-formulaire', authenticateToken, authorizeRole(['client']), prestataireController.getReservationFormByClient);
router.post('/:prestataireId/services/:serviceId/reservation-formulaire', authenticateToken, authorizeRole(['client']), prestataireController.submitReservationByClient);

module.exports = router;  
