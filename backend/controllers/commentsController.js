const Comments = require('../models/commentsModel');

const commentsController = {
  getPrestataireComments: (req, res) => {
    const prestataireId = req.params.prestataire_id;

    Comments.getCommentsByPrestataire(prestataireId, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des avis :', err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
      } else {
        res.status(200).json({ comments: results });
      }
    });
  }
};

module.exports = commentsController;