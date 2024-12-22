const db = require('../config/db');

const Comments = {
  // Récupérer les avis d'un prestataire
  getCommentsByPrestataire: (prestataireId, callback) => {
    const query = `
      SELECT c.comment_id, c.created_at, c.content, c.rating, cl.firstname, cl.familyname
      FROM Commentaire c
      JOIN Client cl ON c.client_id = cl.client_id
      WHERE c.prestataire_id = ?
      ORDER BY c.created_at DESC
    `;
    db.query(query, [prestataireId], callback);
  }
};

module.exports = Comments;