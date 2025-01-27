
const express = require('express');
const router = express.Router();
const checklistTasksController = require('../controllers/checklistTasksController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');


// prestataire Routes
/**
 * @swagger
 * /checklist-tasks:
 *   get:
 *     summary: Get checklist tasks for a prestataire
 *     description: Get the list of checklist tasks assigned to the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of checklist tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   task_id:
 *                     type: integer
 *                     example: 1
 *                   task_name:
 *                     type: string
 *                     example: "Install security system"
 *                   description:
 *                     type: string
 *                     example: "Install CCTV cameras in the office building."
 *                   deadline:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-28"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, authorizeRole(['prestataire']), checklistTasksController.getPrestataireChecklist);

/**
 * @swagger
 * /checklist-tasks:
 *   post:
 *     summary: Add a checklist task for a prestataire
 *     description: Add a new task to the checklist for the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_name:
 *                 type: string
 *                 example: "Install firewall"
 *               description:
 *                 type: string
 *                 example: "Setup and configure the firewall to secure the network."
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-15"
 *     responses:
 *       201:
 *         description: Task added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken , authorizeRole(['prestataire']), checklistTasksController.AddPrestataireChecklist);



/**
 * @swagger
 * /checklist-tasks:
 *   delete:
 *     summary: Delete a checklist task for a prestataire
 *     description: Delete a specific task from the checklist for the authenticated prestataire
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/', authenticateToken , authorizeRole(['prestataire']), checklistTasksController.deletePrestataireChecklist);



module.exports = router;  
