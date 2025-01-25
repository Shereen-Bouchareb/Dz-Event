const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

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
 *                     type: object
 *                     properties:
 *                       comment_id:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-25T14:48:00.000Z"
 *                       content:
 *                         type: string
 *                         example: "Excellent service!"
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 4.8
 *                       firstName:
 *                         type: string
 *                         example: "fatiha"
 *                       familyName:
 *                         type: string
 *                         example: "baloul"
 *       401:
 *         description: Unauthorized - Token missing or invalid.
 *       403:
 *         description: Forbidden - User does not have access to this resource.
 *       500:
 *         description: Internal server error.
 */
router.get('/',authenticateToken,authorizeRole(['prestataire']),commentsController.getPrestataireComments);

module.exports = router;

