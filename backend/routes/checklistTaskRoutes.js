
const express = require('express');
const router = express.Router();
const checklistTasksController = require('../controllers/checklistTasksController'); 
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');


// prestataire Routes

router.get('/', authenticateToken, authorizeRole(['prestataire']), checklistTasksController.getPrestataireChecklist);
router.post('/', authenticateToken , authorizeRole(['prestataire']), checklistTasksController.AddPrestataireChecklist);
router.delete('/', authenticateToken , authorizeRole(['prestataire']), checklistTasksController.deletePrestataireChecklist);



module.exports = router;  
