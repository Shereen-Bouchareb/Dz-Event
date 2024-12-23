//Gestion des routes pour le profilr
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../middlewares/uploadMiddleware'); // Assurez-vous de configurer 'multer' dans ce fichier



// Récupérer le profil du prestataire
router.get('/profile/:id', profileController.getProfile);

// Mettre à jour le profil (nom, wilaya, bio, description)
router.post('/profile/:id', profileController.updateProfile);

// Mettre à jour la photo de profil
router.post('/profile/:id/photo', upload.single('profile_pic'), profileController.updateProfilePic);

module.exports = router;
