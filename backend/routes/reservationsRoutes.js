const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// prestataire Routes

/**
 * @swagger
 * /reservations/pending:
 *   get:
 *     summary: Get pending reservations for the prestataire
 *     description: Get the list of pending reservations for the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reservation_id:
 *                     type: integer
 *                     example: 123
 *                   service_name:
 *                     type: string
 *                     example: "Cleaning Service"
 *                   event_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-01"
 *                   reservation_status:
 *                     type: string
 *                     example: "pending"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/pending', authenticateToken, authorizeRole(['prestataire']), reservationsController.getPendingReservation);

/**
 * @swagger
 * /reservations/pending/{reservationId}/accept:
 *   put:
 *     summary: Accept a pending reservation for the prestataire
 *     description: Accept a specific pending reservation for the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         description: The ID of the reservation to accept
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Reservation accepted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.put('/pending/:reservationId/accept', authenticateToken, authorizeRole(['prestataire']), reservationsController.acceptReservation);

/**
 * @swagger
 * /reservations/pending/{reservationId}/reject:
 *   put:
 *     summary: Reject a pending reservation for the prestataire
 *     description: Reject a specific pending reservation for the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         description: The ID of the reservation to reject
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Reservation rejected
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.put('/pending/:reservationId/reject', authenticateToken, authorizeRole(['prestataire']), reservationsController.rejectReservation);

// client routes 

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations for the client
 *     description: Get the list of all reservations for the authenticated client
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of client reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reservation_id:
 *                     type: integer
 *                     example: 456
 *                   service_name:
 *                     type: string
 *                     example: "photographer"
 *                   event_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-20"
 *                   reservation_status:
 *                     type: string
 *                     example: "confirmed"
 *                   prestataire_first_name:
 *                     type: string
 *                     example: "saloua"
 *                   prestataire_last_name:
 *                     type: string
 *                     example: "majd"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No reservations found
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, authorizeRole(['client']), reservationsController.getClientReservations);

module.exports = router;
