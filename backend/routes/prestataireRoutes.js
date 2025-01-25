const express = require('express');
const router = express.Router();
const prestataireController = require('../controllers/prestataireController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// prestataire Routes

/**
 * @swagger
 * path:
 *  /prestataire:
 *    get:
 *      summary: Récupérer tous les prestataires
 *      description: Cette route permet de récupérer tous les prestataires disponibles.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      responses:
 *        '200':
 *          description: Liste des prestataires récupérée avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: L'identifiant unique du prestataire.
 *                    firstname:
 *                      type: string
 *                      description: Le prénom du prestataire.
 *                    familyname:
 *                      type: string
 *                      description: Le nom de famille du prestataire.
 *                    userBio:
 *                      type: string
 *                      description: Une brève bio du prestataire.
 *                    Job_description:
 *                      type: string
 *                      description: La description du travail du prestataire.
 *                    rating:
 *                      type: number
 *                      format: float
 *                      description: La note moyenne des prestataires.
 *              example:
 *                [
 *                  {
 *                    "id": 1,
 *                    "firstname": "faycel",
 *                    "familyname": "azouaou",
 *                    "userBio": "Prestataire en nettoyage.",
 *                    "Job_description": "Services de nettoyage pour entreprises.",
 *                    "rating": 4.5
 *                  },
 *                  {
 *                    "id": 2,
 *                    "firstname": "fatiha",
 *                    "familyname": "baloul",
 *                    "userBio": "Prestataire en sécurité.",
 *                    "Job_description": "Sécurité pour événements.",
 *                    "rating": 4.8
 *                  }
 *                ]
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/', authenticateToken, authorizeRole(['client']), prestataireController.getAllPrestataire);

/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}:
 *    get:
 *      summary: Récupérer un prestataire par ID
 *      description: Cette route permet de récupérer les détails d'un prestataire spécifique par son ID.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          required: true
 *          description: ID du prestataire à récupérer.
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Détails du prestataire récupérés avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: L'identifiant unique du prestataire.
 *                  firstname:
 *                    type: string
 *                    description: Le prénom du prestataire.
 *                  familyname:
 *                    type: string
 *                    description: Le nom de famille du prestataire.
 *                  userBio:
 *                    type: string
 *                    description: Une brève bio du prestataire.
 *                  Job_description:
 *                    type: string
 *                    description: La description du travail du prestataire.
 *                  rating:
 *                    type: number
 *                    format: float
 *                    description: La note moyenne des prestataires.
 *              example:
 *                {
 *                  "id": 1,
 *                  "firstname": "faycel",
 *                  "familyname": "azouaou",
 *                  "userBio": "Prestataire en nettoyage.",
 *                  "Job_description": "Services de nettoyage pour entreprises.",
 *                  "rating": 4.5
 *                }
 *        '404':
 *          description: Prestataire non trouvé.
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireById);

/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/comments:
 *    post:
 *      summary: Ajouter un commentaire pour un prestataire
 *      description: Permet à un client d'ajouter un commentaire pour un prestataire spécifique.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          required: true
 *          description: ID du prestataire pour lequel le commentaire est ajouté.
 *          schema:
 *            type: integer
 *        - name: content
 *          in: body
 *          required: true
 *          description: Contenu du commentaire.
 *          schema:
 *            type: string
 *        - name: rating
 *          in: body
 *          required: true
 *          description: La note du prestataire (1-5).
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 5
 *      responses:
 *        '201':
 *          description: Commentaire ajouté avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  commentId:
 *                    type: integer
 *              example:
 *                message: "Commentaire ajouté avec succès pour le prestataire."
 *                commentId: 123
 *        '400':
 *          description: Le contenu et la note sont nécessaires.
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.post('/:prestataireId/comments', authenticateToken, authorizeRole(['client']), prestataireController.submitComment);

/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/services:
 *    get:
 *      summary: Récupérer les services d'un prestataire
 *      description: Permet de récupérer les services proposés par un prestataire spécifique.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          required: true
 *          description: ID du prestataire pour récupérer ses services.
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Liste des services récupérée avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    service_id:
 *                      type: integer
 *                      description: L'identifiant du service.
 *                    service_name:
 *                      type: string
 *                      description: Le nom du service.
 *                    description:
 *                      type: string
 *                      description: La description du service.
 *                    price:
 *                      type: number
 *                      format: float
 *                      description: Le prix du service.
 *              example:
 *                [
 *                  {
 *                    "service_id": 1,
 *                    "service_name": "Nettoyage bureau",
 *                    "description": "Service de nettoyage pour bureaux.",
 *                    "price": 100.0
 *                  },
 *                  {
 *                    "service_id": 2,
 *                    "service_name": "Sécurité événementielle",
 *                    "description": "Surveillance pour événements.",
 *                    "price": 250.0
 *                  }
 *                ]
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId/services', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireServicesByClient);

/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/Gallery:
 *    get:
 *      summary: Récupérer la galerie des photos d'un prestataire
 *      description: Permet de récupérer la galerie de photos d'un prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          required: true
 *          description: ID du prestataire pour récupérer sa galerie.
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Liste des photos récupérées avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    picture_id:
 *                      type: integer
 *                      description: L'identifiant de la photo.
 *                    url:
 *                      type: string
 *                      description: L'URL de la photo.
 *                    uploaded_at:
 *                      type: string
 *                      format: date-time
 *                      description: La date d'upload de la photo.
 *              example:
 *                [
 *                  {
 *                    "picture_id": 1,
 *                    "url": "https://example.com/photo1.jpg",
 *                    "uploaded_at": "2025-01-01T00:00:00Z"
 *                  },
 *                  {
 *                    "picture_id": 2,
 *                    "url": "https://example.com/photo2.jpg",
 *                    "uploaded_at": "2025-01-02T00:00:00Z"
 *                  }
 *                ]
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId/Gallery', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireGalleryByClient);

/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/services/{serviceId}/comments:
 *    get:
 *      summary: Récupérer les commentaires d'un service spécifique d'un prestataire
 *      description: Permet de récupérer les commentaires d'un service spécifique d'un prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          required: true
 *          description: ID du prestataire.
 *          schema:
 *            type: integer
 *        - name: serviceId
 *          in: path
 *          required: true
 *          description: ID du service pour lequel les commentaires sont demandés.
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Liste des commentaires récupérée avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    comment:
 *                      type: string
 *                      description: Le contenu du commentaire.
 *                    rating:
 *                      type: integer
 *                      description: La note donnée par l'utilisateur.
 *              example:
 *                [
 *                  {
 *                    "comment": "Très bon service de nettoyage.",
 *                    "rating": 5
 *                  },
 *                  {
 *                    "comment": "Service de sécurité satisfaisant.",
 *                    "rating": 4
 *                  }
 *                ]
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId/services/:serviceId/comments', authenticateToken, authorizeRole(['client']), prestataireController.getServiceComments);

module.exports = router;
