const db = require('../config/db');

const Prestataire = {
  // Fonction pour créer un prestataire
  create: (data, callback) => {
    const query = `
      INSERT INTO Prestataire (firstname, familyname, Gmail_ad, password, role, job_description, service, userBio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.first_name,
      data.familly_name,
      data.email,
      data.password, // Mot de passe en clair
      data.role, // Rôle du prestataire (ex : Photographe, Caterer, etc.)
      data.description,
      data.service,
      data.bio,
    ];

    db.query(query, values, callback);
  },

  // Fonction pour vérifier si un prestataire avec l'email existe déjà
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM Prestataire WHERE Gmail_ad = ?';
    db.query(query, [email], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]); // Retourne le premier prestataire trouvé (ou null si aucun)
    });
  },
};

module.exports = Prestataire;
