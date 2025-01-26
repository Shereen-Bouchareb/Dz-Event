
const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');



// prestataire Routes

router.get('/pending', authenticateToken, authorizeRole(['prestataire']), reservationsController.getPrestataireReservations );
router.put('/pending/:reservationId/accept' ,  authenticateToken, authorizeRole(['prestataire']), reservationsController.acceptReservation);
router.put('/pending/:reservationId/reject' ,  authenticateToken, authorizeRole(['prestataire']), reservationsController.rejectReservation);
//reservation id = {eventdate-serviceId-clientId} ( 1-1-2)

// client routes 
router.get('/', authenticateToken, authorizeRole(['client']), reservationsController.getClientReservations);



module.exports = router; 
