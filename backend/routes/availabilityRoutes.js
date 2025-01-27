const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * /availability:
 *   get:
 *     summary: Get available timeslots for a prestataire
 *     description: Get the list of available timeslots for the authenticated prestataire (only status=Available)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of available timeslots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Dispo_id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-01"
 *                   status:
 *                     type: string
 *                     enum:
 *                       - "Available"
 *                       - "Unavailable"
 *                     example: "Available"
 *                   Prestataire_id:
 *                     type: integer
 *                     example: 1
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, authorizeRole(['prestataire']), availabilityController.getPrestataireAvailability);

/**
 * @swagger
 * /availability:
 *   post:
 *     summary: Add a new availability for a prestataire
 *     description: Add a new available timeslot for the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               status:
 *                 type: string
 *                 enum:
 *                   - "Available"
 *                   - "Unavailable"
 *                 example: "Available"
 *     responses:
 *       201:
 *         description: Availability added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Dispo_id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, authorizeRole(['prestataire']), availabilityController.addPrestataireAvailability);

/**
 * @swagger
 * /availability:
 *   delete:
 *     summary: Delete a prestataire's availability
 *     description: Delete a specific availability from the prestataire's schedule
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Dispo_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Availability deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Availability not found
 *       500:
 *         description: Server error
 */
router.delete('/', authenticateToken, authorizeRole(['prestataire']), availabilityController.deletePrestataireAvailability);

module.exports = router;
