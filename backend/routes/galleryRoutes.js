//(Routes pour gérer la galerie
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middlewares/uploadMiddleware'); // Middleware pour l'upload des fichiers

// Ajouter une photo à la galerie
router.post('/gallery/:prestataire_id/add', upload.single('photo'), galleryController.addPhoto);

// Supprimer une photo de la galerie
router.delete('/gallery/:prestataire_id/delete/:photo_id', galleryController.deletePhoto);

// Afficher toutes les photos d'un prestataire
router.get('/gallery/:prestataire_id', galleryController.getPhotos);


module.exports = router;