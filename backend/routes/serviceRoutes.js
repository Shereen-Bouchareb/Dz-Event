const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - service_name
 *         - ser_description
 *         - price
 *       properties:
 *         service_id:
 *           type: integer
 *           description: ID unique du service
 *         service_name:
 *           type: string
 *           description: Nom du service
 *           example: "Photographie de mariage"
 *         ser_description:
 *           type: string
 *           description: Description détaillée du service
 *           example: "Service complet de photographie pour les mariages, incluant un album photo."
 *         price:
 *           type: number
 *           description: Prix du service
 *           example: 1500.00
 *         Prestataire_id:
 *           type: integer
 *           description: ID du prestataire
 *           example: 1
 */

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Gestion des services pour les prestataires
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Récupérer les services d'un prestataire
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des services récupérés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', authenticateToken, authorizeRole(['prestataire']), serviceController.getPrestataireServices);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Ajouter un nouveau service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *           example:
 *             service_name: "DJ pour mariage"
 *             ser_description: "DJ professionnel pour animer vos soirées et mariages."
 *             price: 2000.00
 *     responses:
 *       201:
 *         description: Service ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service ajouté avec succès."
 *                 serviceId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Champs manquants ou invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', authenticateToken, authorizeRole(['prestataire']), serviceController.addPrestataireService);

/**
 * @swagger
 * /services:
 *   delete:
 *     summary: Supprimer un service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: integer
 *                 description: ID du service à supprimer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Service supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service supprimé avec succès."
 *       400:
 *         description: ID du service manquant
 *       404:
 *         description: Service non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/', authenticateToken, authorizeRole(['prestataire']), serviceController.deletePrestataireService);

module.exports = router;

