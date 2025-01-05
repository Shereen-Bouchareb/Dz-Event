const db = require('../config/db');

const getCommentsByPrestataire = (prestataireId, callback) => {
    const query = `
      SELECT 
        c.comment_id, 
        c.created_at, 
        c.content, 
        c.rating, 
        cl.firstName, 
        cl.familyName
      FROM 
        commentaire c
      JOIN 
        client cl ON c.client_id = cl.client_id
      JOIN 
        reserver r ON r.client_id = cl.client_id
      JOIN 
        services s ON s.service_id = r.service_id
      WHERE 
        s.Prestataire_id = ?
      ORDER BY 
        c.created_at DESC
    `;

    db.query(query, [prestataireId], callback); // Exécution de la requête avec le paramètre prestataireId
};

module.exports = { 
    getCommentsByPrestataire,
};


