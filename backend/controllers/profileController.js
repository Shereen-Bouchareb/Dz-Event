const Profile = require('../models/profileModel');

// Récupérer le profil du prestataire
exports.getProfile = (req, res) => {
  const prestataire_id = req.params.id;  // Par exemple, depuis le paramètre de l'URL

  Profile.getProfile(prestataire_id, (err, profile) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
    }
    res.json(profile);
  });
};

// Mettre à jour le profil
exports.updateProfile = (req, res) => {
  const prestataire_id = req.params.id;
  const { firstname, familyname, wilaya, userBio, job_description, profile_pic_url } = req.body;

  Profile.updateProfile(prestataire_id, {
    firstname,
    familyname,
    wilaya,
    userBio,
    job_description,
    profile_pic_url
  }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
    res.json({ message: 'Profil mis à jour avec succès' });
  });
};

// Mettre à jour la photo de profil
exports.updateProfilePic = (req, res) => {
  const prestataire_id = req.params.id;
  const profile_pic_url = req.file.path; // Assurez-vous d'utiliser un middleware comme 'multer' pour gérer les fichiers

  Profile.updateProfilePic(prestataire_id, profile_pic_url, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la photo de profil' });
    }
    res.json({ message: 'Photo de profil mise à jour avec succès' });
  });
};
