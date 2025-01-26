const db = require('../config/db');



exports.getPrestataireComments = async (prestataire_id) => {
    try {
        const query = `
            SELECT DISTINCT
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

        const [results] = await db.execute(query, [prestataire_id]);
        return results; // Return all comments for the prestataire
    } catch (error) {
        throw new Error('Error retrieving comments: ' + error.message);
    }
};