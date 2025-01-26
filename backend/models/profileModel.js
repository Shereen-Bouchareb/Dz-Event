const db = require('../config/db');

// Ajouter une photo
exports.addPrestatairePicture = async (prestataire_id, photoUrl) => {
  const query = `
    INSERT INTO pictures (url, Prestataire_id) 
    VALUES (?, ?)
  `;
  try {
    const [result] = await db.promise().query(query, [photoUrl, prestataire_id]);
    return result;
  } catch (error) {
    throw new Error(`Erreur lors de l'ajout de la photo : ${error.message}`);
  }
};

// Récupérer toutes les photos
exports.getPrestatairePictures = async (prestataire_id) => {
  const query = `
    SELECT picture_id, url, uploaded_at 
    FROM pictures 
    WHERE Prestataire_id = ?
  `;
  try {
    const [results] = await db.promise().query(query, [prestataire_id]);
    return results;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des photos : ${error.message}`);
  }
};

// Mettre à jour le profil d'un prestataire
exports.editPrestataireProfile = async (prestataire_id, data) => {
  const query = `
    UPDATE prestataire
    SET firstname = ?, familyname = ?, userBio = ?, job_description = ?, profile_pic_url = ?
    WHERE Prestataire_id = ?
  `;
  const values = [
    data.firstname,
    data.familyname,
    data.userBio,
    data.job_description,
    data.profile_pic_url,
    prestataire_id
  ];
  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du profil : ${error.message}`);
  }
};
