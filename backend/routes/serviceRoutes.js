const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Ajouter un service
router.post('/services', serviceController.addService);

// Récupérer les services d'un prestataire
router.get('/services/:prestataireId', serviceController.getServices);

// Mettre à jour un service
router.put('/services/:id', serviceController.updateService);

// Supprimer un service
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;
