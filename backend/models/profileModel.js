const db = require('../config/db');

const Profile = {
  getProfile: (prestataire_id, callback) => {
    const query = 'SELECT * FROM Prestataire WHERE Prestataire_id = ?';
    db.query(query, [prestataire_id], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  updateProfile: (prestataire_id, data, callback) => {
    const query = `
      UPDATE Prestataire
      SET firstname = ?, familyname = ?, wilaya = ?, userBio = ?, job_description = ?, profile_pic_url = ?
      WHERE Prestataire_id = ?
    `;
    const values = [
      data.firstname,
      data.familyname,
      data.wilaya,
      data.userBio,
      data.job_description,
      data.profile_pic_url,
      prestataire_id
    ];

    db.query(query, values, callback);
  },

  updateProfilePic: (prestataire_id, profile_pic_url, callback) => {
    const query = 'UPDATE Prestataire SET profile_pic_url = ? WHERE Prestataire_id = ?';
    db.query(query, [profile_pic_url, prestataire_id], callback);
  },
};

module.exports = Profile;
