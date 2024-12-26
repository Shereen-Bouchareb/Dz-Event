const Comments = require('../models/commentsModel');


  exports.getPrestataireComments= (req, res) => { 
    const prestataireId = req.user.id;    // Utilisation de l'ID du prestataire dans le token

    Comments.getCommentsByPrestataire(prestataireId, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des avis :', err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
      } else {
        res.status(200).json({ comments: results });
      }
    });
  }

module.exports = commentsController;
