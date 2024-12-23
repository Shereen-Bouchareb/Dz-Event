const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Récupérer tous les prestataires avec leur rating
router.get('/prestataires', ratingController.getAllPrestataires);

// Ajouter un commentaire avec un rating (ajout dans la table Commentaire)
router.post('/prestataires/:id/commentaire', ratingController.addCommentaire);

// Mettre à jour le rating d'un commentaire spécifique
router.put('/commentaires/:commentId/rating', ratingController.updateRating);

// Récupérer le rating moyen de tous les prestataires
router.get('/prestataires/average-rating', ratingController.getAverageRating);

// Récupérer un prestataire par son ID
router.get('/prestataires/:id', ratingController.getPrestataireById);

module.exports = router;
