const Gallery = require('../models/galleryModel');

const galleryController = {
  // Ajouter une photo
  addPhoto: async (req, res) => {
    const { prestataire_id } = req.params;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!photoUrl) {
      return res.status(400).json({ message: 'Aucune photo téléchargée.' });
    }

    try {
      await Gallery.addPhoto(prestataire_id, photoUrl);
      res.status(201).json({ message: 'Photo ajoutée avec succès.', photoUrl });
    } catch (error) {
      console.error('Erreur lors de l’ajout de la photo :', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },

  // Supprimer une photo
  deletePhoto: async (req, res) => {
    const { prestataire_id, photo_id } = req.params;

    try {
      const result = await Gallery.deletePhoto(prestataire_id, photo_id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Photo non trouvée ou non autorisée.' });
      }
      res.status(200).json({ message: 'Photo supprimée avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo :', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },

  // Récupérer toutes les photos
  getPhotos: async (req, res) => {
    const { prestataire_id } = req.params;

    try {
      const photos = await Gallery.getPhotos(prestataire_id);
      res.status(200).json({ photos });
    } catch (error) {
      console.error('Erreur lors de la récupération des photos :', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  },
};

module.exports = galleryController;