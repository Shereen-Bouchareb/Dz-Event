
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// prestataire Routes
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - rating
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: ID unique du commentaire
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date et heure de la création du commentaire
 *           example: "2025-01-25T14:48:00.000Z"
 *         content:
 *           type: string
 *           description: Contenu du commentaire
 *           example: "Excellent service!"
 *         rating:
 *           type: number
 *           format: float
 *           description: Note donnée au service (de 1 à 5)
 *           example: 4.8
 *         firstName:
 *           type: string
 *           description: Prénom de la personne ayant laissé le commentaire
 *           example: "fatiha"
 *         familyName:
 *           type: string
 *           description: Nom de famille de la personne ayant laissé le commentaire
 *           example: "baloul"
 *         pictures:
 *           type: array
 *           description: Liste des images liées au commentaire
 *           items:
 *             type: object
 *             properties:
 *               picture_id:
 *                 type: integer
 *                 description: ID unique de l'image
 *                 example: 1
 *               url:
 *                 type: string
 *                 description: URL de l'image
 *                 example: "http://example.com/picture.jpg"
 *               uploaded_at:
 *                 type: string
 *                 format: date-time
 *                 description: Date d'upload de l'image
 *                 example: "2025-01-25T14:48:00.000Z"
 *         prestataire_id:
 *           type: integer
 *           description: ID du prestataire pour lequel le commentaire a été laissé
 *           example: 123
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Retrieve comments for a specific Prestataire
 *     description: This endpoint retrieves all comments left for a Prestataire. The Prestataire's ID is extracted from the token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized - Token missing or invalid.
 *       403:
 *         description: Forbidden - User does not have access to this resource.
 *       500:
 *         description: Internal server error.
 */

router.get('/', authenticateToken, authorizeRole(['prestataire']), commentsController.getPrestataireComments);




module.exports = router; 
