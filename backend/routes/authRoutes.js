// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importing the auth controller

// Signup routes
/**
 * @swagger
 * /api/signup/prestataire:
 *   post:
 *     summary: Sign up a new Prestataire
 *     description: This endpoint allows a new Prestataire to sign up.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - familyName
 *               - password
 *               - Gmail_ad
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "faycel"
 *               familyName:
 *                 type: string
 *                 example: "Azouaou"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"   # Indicating plaintext password (will be hashed before storage)
 *               Gmail_ad:
 *                 type: string
 *                 format: email
 *                 example: "azouaou.doe@example.com"
 *               userBio:
 *                 type: string
 *                 example: "Experienced photographer"
 *               Job_description:
 *                 type: string
 *                 example: "Wedding photography services"
 *               role:
 *                 type: string
 *                 example: "prestataire"
 *               profile_pic_url:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       201:
 *         description: Successfully signed up the Prestataire
 *       400:
 *         description: Invalid input (e.g., missing required fields)
 */
router.post('/signup/prestataire', authController.signupPrestataire);  

/**
 * @swagger
 * /api/signup/client:
 *   post:
 *     summary: Sign up a new Client
 *     description: This endpoint allows a new Client to sign up.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - familyName
 *               - password
 *               - GmailAd
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "faycel"
 *               familyName:
 *                 type: string
 *                 example: "azouaou"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *               GmailAd:
 *                 type: string
 *                 format: email
 *                 example: "azouaou.smith@example.com"
 *     responses:
 *       201:
 *         description: Successfully signed up the Client
 *       400:
 *         description: Invalid input (e.g., missing required fields)
 */

router.post('/signup/client', authController.signupClient);         

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login (for both Prestataire and Client)
 *     description: This endpoint allows both Prestataire and Client to log in using their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Gmail_ad
 *               - password
 *               - userType
 *             properties:
 *               Gmail_ad:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *               userType:
 *                 type: string
 *                 enum:
 *                   - prestataire
 *                   - client
 *                 example: "prestataire"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized - Invalid credentials
 */


router.post('/login', authController.login);  // For Login (both Prestataire and Client)

module.exports = router;  // Exporting the router to be used in app.js
