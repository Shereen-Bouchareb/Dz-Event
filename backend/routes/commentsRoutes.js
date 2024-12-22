const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// Route pour récupérer les avis d'un prestataire
router.get('/:prestataire_id', commentsController.getPrestataireComments);

module.exports = router;
