const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// **Prestataire Routes**

/**
 * @swagger
 * path:
 *  /prestataire/pending:
 *    get:
 *      summary: Récupérer les réservations en attente pour un prestataire
 *      description: Permet de récupérer toutes les réservations qui sont en attente pour un prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      responses:
 *        '200':
 *          description: Liste des réservations en attente récupérées avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    service_id:
 *                      type: integer
 *                      description: ID du service réservé.
 *                    client_name:
 *                      type: string
 *                      description: Nom du client ayant effectué la réservation.
 *                    event_date:
 *                      type: string
 *                      format: datetime
 *                      description: Date de l'événement réservé.
 *                    reservation_status:
 *                      type: string
 *                      enum: ['en attente', 'approved', 'rejected']
 *                      description: Statut de la réservation.
 *              example:
 *                [
 *                  {
 *                    "service_id": 1,
 *                    "client_name": "kamel tari",
 *                    "event_date": "2025-02-14 00:00:00",
 *                    "reservation_status": "en attente"
 *                  },
 *                  {
 *                    "service_id": 2,
 *                    "client_name": "alaa rhmn",
 *                    "event_date": "2025-03-20 00:00:00",
 *                    "reservation_status": "en attente"
 *                  }
 *                ]
 *        '400':
 *          description: Paramètre invalide.
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/pending', authenticateToken, authorizeRole(['prestataire']), reservationsController.getPrestataireReservations);


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

// **Client Routes**

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
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *                   event_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-20"
 *                   reservation_status:
 *                     type: string
 *                     enum:
 *                       - "en attente"
 *                       - "approved"
 *                       - "rejected"
 *                     example: "approved"
 *                   prestataire_first_name:
 *                     type: string
 *                     example: "Saloua"
 *                   prestataire_last_name:
 *                     type: string
 *                     example: "Majd"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No reservations found
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, authorizeRole(['client']), reservationsController.getClientReservations);

module.exports = router;
