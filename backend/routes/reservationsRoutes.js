
const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');



// prestataire Routes

router.get('/pending', authenticateToken, authorizeRole(['prestataire']), reservationsController.getPendingReservation);
router.put('/pending/:reservationId/accept' ,  authenticateToken, authorizeRole(['prestataire']), reservationsController.acceptReservation);
router.put('/pending/:reservationId/accept' ,  authenticateToken, authorizeRole(['prestataire']), reservationsController.rejectReservation);
router.get('/pending/')

// client routes 
router.get('/', authenticateToken, authorizeRole(['client']), reservationsController.getClientReservations);



module.exports = router; 
