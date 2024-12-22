//crée un modèle pour gérer l'utilisateur dans la base de donnée
const db = require('../config/db');

const Client = {
    // Fonction pour créer un client
    create: async (firstName, familyName, GmailAd, password) => {
        const [rows] = await db.execute(
            'INSERT INTO Client (firstName, familyName, GmailAd, password) VALUES (?, ?, ?, ?)', 
            [firstName, familyName, GmailAd, password]
        );
        return rows;
    },

    // Fonction pour rechercher un client par email
    findByEmail: async (GmailAd) => {
        const [rows] = await db.execute('SELECT * FROM Client WHERE GmailAd = ?', [GmailAd]);
        return rows[0]; // Retourne le premier client trouvé (ou null si aucun)
    }
};

module.exports = Client;
