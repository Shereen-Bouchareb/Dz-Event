const profile = require('../models/profileModel');

  // Ajouter une photo
  exports.addPrestatairePicture= async (req, res) => {
    const { prestataire_id } = req.user.id;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!photoUrl) {
      return res.status(400).json({ message: 'Aucune photo téléchargée.' });
    }

    try {
      await profile.addPrestatairePicture(prestataire_id, photoUrl);
      res.status(201).json({ message: 'Photo ajoutée avec succès.', photoUrl });
    } catch (error) {
      console.error('Erreur lors de l’ajout de la photo :', error.message);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };

  // Récupérer toutes les photos
  exports.getPrestatairePictures= async (req, res) => {
    const { prestataire_id } = req.user.id;

    try {
      const photos = await profile.getPrestatairePictures(prestataire_id);
      res.status(200).json({ photos });
    } catch (error) {
      console.error('Erreur lors de la récupération des photos :', error.message);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };


  exports.editPrestataireProfile= async (req, res) => {
    const { prestataire_id } = req.user.id;
    const { firstname, familyname, wilaya, userBio, job_description, profile_pic_url } = req.body;
    try {
      await profile.editPrestataireProfile(prestataire_id, {
        firstname,
        familyname,
        wilaya,
        userBio,
        job_description,
        profile_pic_url,
      });
      res.status(200).json({ message: 'Profil mis à jour avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error.message);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };




module.exports = profileController;


