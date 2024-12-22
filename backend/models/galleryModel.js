const db = require('../config/db');

const Gallery = {
  // Ajouter une photo
  addPhoto: (prestataire_id, photoUrl) => {
    const query = `
      INSERT INTO Pictures (url, Prestataire_id) 
      VALUES (?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [photoUrl, prestataire_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Supprimer une photo
  deletePhoto: (prestataire_id, photo_id) => {
    const query = `
      DELETE FROM Pictures 
      WHERE picture_id = ? AND Prestataire_id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [photo_id, prestataire_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Récupérer toutes les photos
  getPhotos: (prestataire_id) => {
    const query = `
      SELECT picture_id, url, uploaded_at 
      FROM Pictures 
      WHERE Prestataire_id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [prestataire_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Gallery;
