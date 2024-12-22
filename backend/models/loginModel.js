const db = require('../config/db');

exports.verifyUser = (email, password, table) => {
  return new Promise((resolve, reject) => {
    // Déterminez la colonne d'email en fonction du type d'utilisateur
    const emailColumn = table === 'Prestataire' ? 'Gmail_ad' : 'GmailAd';
    const query = `SELECT * FROM ${table} WHERE ${emailColumn} = ? AND password = ?`;

    db.query(query, [email, password], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};
