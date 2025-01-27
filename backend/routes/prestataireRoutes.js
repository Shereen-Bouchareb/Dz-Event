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
 *  /prestataire/{prestataireId}/comments:
 *    get:
 *      summary: Récupérer les commentaires d'un prestataire
 *      description: Permet de récupérer les commentaires laissés pour un prestataire spécifique.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          required: true
 *          description: L'identifiant du prestataire dont on veut récupérer les commentaires.
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
 *                    comment_id:
 *                      type: integer
 *                      description: L'identifiant unique du commentaire.
 *                    created_at:
 *                      type: string
 *                      format: date-time
 *                      description: La date de création du commentaire.
 *                    content:
 *                      type: string
 *                      description: Le contenu du commentaire.
 *                    rating:
 *                      type: integer
 *                      description: La note donnée par l'utilisateur.
 *                    firstName:
 *                      type: string
 *                      description: Le prénom du client ayant laissé le commentaire.
 *                    familyName:
 *                      type: string
 *                      description: Le nom de famille du client ayant laissé le commentaire.
 *              example:
 *                [
 *                  {
 *                    "comment_id": 1,
 *                    "created_at": "2025-01-20T10:00:00Z",
 *                    "content": "Très bon service, je recommande.",
 *                    "rating": 5,
 *                    "firstName": "Ahmed",
 *                    "familyName": "Ben Ali"
 *                  },
 *                  {
 *                    "comment_id": 2,
 *                    "created_at": "2025-01-18T14:30:00Z",
 *                    "content": "Service correct mais peut être amélioré.",
 *                    "rating": 4,
 *                    "firstName": "Sofia",
 *                    "familyName": "Mekki"
 *                  }
 *                ]
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId/comments', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireCommentsByClient);



/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/availability:
 *    get:
 *      summary: Récupérer la disponibilité d'un prestataire
 *      description: Cette route permet de récupérer la disponibilité d'un prestataire pour un service spécifique.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          description: L'identifiant unique du prestataire.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Disponibilité du prestataire récupérée avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    date:
 *                      type: string
 *                      format: date
 *                      description: La date de disponibilité.
 *                    status:
 *                      type: string
 *                      enum: [Available, Unavailable]
 *                      description: Le statut de la disponibilité.
 *              example:
 *                [
 *                  { "date": "2025-02-14", "status": "Available" },
 *                  { "date": "2025-02-15", "status": "Unavailable" }
 *                ]
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId/availability', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireAvailabilityByClient);



/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/services/{serviceId}/reservation-formulaire:
 *    get:
 *      summary: Récupérer un formulaire de réservation pour un service d'un prestataire
 *      description: Cette route permet de récupérer le formulaire de réservation pour un service spécifique d'un prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          description: L'identifiant unique du prestataire.
 *          required: true
 *          schema:
 *            type: integer
 *        - name: serviceId
 *          in: path
 *          description: L'identifiant unique du service.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Formulaire de réservation récupéré avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  address:
 *                    type: string
 *                    description: L'adresse du client.
 *                  wilaya:
 *                    type: string
 *                    description: La wilaya du client.
 *                  num_tel:
 *                    type: string
 *                    description: Le numéro de téléphone du client.
 *              example:
 *                {
 *                  "address": "123 Main Street",
 *                  "wilaya": "Algiers",
 *                  "num_tel": "123456789"
 *                }
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/:prestataireId/services/:serviceId/reservation-formulaire', authenticateToken, authorizeRole(['client']), prestataireController.getReservationFormByClient);


/**
 * @swagger
 * path:
 *  /prestataire/{prestataireId}/services/{serviceId}/reservation-formulaire:
 *    post:
 *      summary: Soumettre un formulaire de réservation pour un service d'un prestataire
 *      description: Cette route permet au client de soumettre un formulaire de réservation pour un service spécifique d'un prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: prestataireId
 *          in: path
 *          description: L'identifiant unique du prestataire.
 *          required: true
 *          schema:
 *            type: integer
 *        - name: serviceId
 *          in: path
 *          description: L'identifiant unique du service.
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                address:
 *                  type: string
 *                  description: L'adresse du client.
 *                wilaya:
 *                  type: string
 *                  description: La wilaya du client.
 *                num_tel:
 *                  type: string
 *                  description: Le numéro de téléphone du client.
 *            example:
 *              {
 *                "address": "123 Main Street",
 *                "wilaya": "Algiers",
 *                "num_tel": "123456789"
 *              }
 *      responses:
 *        '201':
 *          description: Formulaire de réservation soumis avec succès.
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.post('/:prestataireId/services/:serviceId/reservation-formulaire', authenticateToken, authorizeRole(['client']), prestataireController.submitReservationFormByClient);



/**
 * @swagger
 * path:
 *  /prestataire/filter-date:
 *    get:
 *      summary: Récupérer les services d'un prestataire filtrés par date
 *      description: Permet de récupérer les services d'un prestataire en fonction d'une date spécifique.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Prestataire
 *      parameters:
 *        - name: date
 *          in: query
 *          required: true
 *          description: La date à partir de laquelle les services sont filtrés.
 *          schema:
 *            type: string
 *            format: date
 *      responses:
 *        '200':
 *          description: Liste des services filtrée par date récupérée avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    service_id:
 *                      type: integer
 *                      description: ID du service.
 *                    service_name:
 *                      type: string
 *                      description: Nom du service.
 *                    ser_description:
 *                      type: string
 *                      description: Description du service.
 *                    price:
 *                      type: number
 *                      format: float
 *                      description: Prix du service.
 *                    available_on:
 *                      type: string
 *                      format: date
 *                      description: Date de disponibilité du service.
 *              example:
 *                [
 *                  {
 *                    "service_id": 1,
 *                    "service_name": "Event Photography",
 *                    "ser_description": "Professional headshots, personal branding, and individual portrait sessions tailored to capture your unique personality.",
 *                    "price": 500.00,
 *                    "available_on": "2025-02-14"
 *                  },
 *                  {
 *                    "service_id": 2,
 *                    "service_name": "Wedding Photography",
 *                    "ser_description": "Capturing the most beautiful moments of your wedding day.",
 *                    "price": 700.00,
 *                    "available_on": "2025-02-14"
 *                  }
 *                ]
 *        '400':
 *          description: Paramètre de date invalide.
 *        '500':
 *          description: Erreur interne du serveur.
 */
router.get('/filter-date', authenticateToken, authorizeRole(['client']), prestataireController.getPrestataireByDate);

module.exports = router;
