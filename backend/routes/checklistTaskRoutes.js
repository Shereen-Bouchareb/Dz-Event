const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

// Ajouter une tâche
router.post('/checklist', checklistController.addTask);

// Récupérer les tâches d'un prestataire
router.get('/checklist/:prestataireId', checklistController.getTasks);

// Supprimer une tâche
router.delete('/checklist/:taskId', checklistController.deleteTask);

module.exports = router;
