
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// prestataire Routes
/**
 * @swagger
 * tags:
 *   name: Profil
 *   description: API pour gérer les photos et les informations des prestataires
 */

/**
 * @swagger
 * path:
 *  /profile:
 *    get:
 *      summary: Récupérer toutes les photos d'un prestataire
 *      description: Cette route permet de récupérer toutes les photos d'un prestataire en fonction de son ID.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Profil
 *      responses:
 *        '200':
 *          description: Photos récupérées avec succès
 *          schema:
 *            type: object
 *            properties:
 *              photos:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    picture_id:
 *                      type: integer
 *                    url:
 *                      type: string
 *                    uploaded_at:
 *                      type: string
 *                      format: date-time
 *        '500':
 *          description: Erreur interne du serveur
 */
router.get('/', authenticateToken, authorizeRole(['prestataire']), profileController.getPrestatairePictures);


/**
 * @swagger
 * path:
 *  /profile:
 *    post:
 *      summary: Ajouter une photo pour le prestataire
 *      description: Cette route permet d'ajouter une photo au profil du prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Profil
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - name: photo
 *          in: formData
 *          type: file
 *          description: La photo à télécharger
 *          required: true
 *      responses:
 *        '201':
 *          description: Photo ajoutée avec succès
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              photoUrl:
 *                type: string
 *        '400':
 *          description: Aucune photo téléchargée
 *        '500':
 *          description: Erreur interne du serveur
 */
router.post('/', authenticateToken, authorizeRole(['prestataire']), profileController.addPrestatairePicture);



/**
 * @swagger
 * path:
 *  /profile:
 *    put:
 *      summary: Mettre à jour le profil d'un prestataire
 *      description: Cette route permet de mettre à jour les informations du profil d'un prestataire.
 *      security:
 *        - BearerAuth: []
 *      tags:
 *        - Profil
 *      parameters:
 *        - name: firstname
 *          in: body
 *          description: Prénom du prestataire
 *          required: false
 *          schema:
 *            type: string
 *        - name: familyname
 *          in: body
 *          description: Nom de famille du prestataire
 *          required: false
 *          schema:
 *            type: string
 *        - name: userBio
 *          in: body
 *          description: Biographie du prestataire
 *          required: false
 *          schema:
 *            type: string
 *        - name: job_description
 *          in: body
 *          description: Description du travail du prestataire
 *          required: false
 *          schema:
 *            type: string
 *        - name: profile_pic_url
 *          in: body
 *          description: URL de la photo de profil
 *          required: false
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Profil mis à jour avec succès
 *        '500':
 *          description: Erreur interne du serveur
 */
router.put('/', authenticateToken, authorizeRole(['prestataire']), profileController.editPrestataireProfile);



// client routes 


module.exports = router;  // Exporting the router to be used in app.js
