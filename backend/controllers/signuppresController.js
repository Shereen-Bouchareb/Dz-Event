// Contrôleur pour l'inscription (signupHandler)
const Prestataire = require('../models/signuppresModel');
const querystring = require('querystring');

const authController = {
  signupHandler: (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { first_name, familly_name, email, role, service, description, bio, password, confirm_password } = JSON.parse(body);

      // Validation des champs obligatoires
      if (!first_name || !familly_name || !email || !role || !password || !confirm_password) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
      }

      // Validation des mots de passe
      if (password !== confirm_password) {
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
      }

      // Vérification si le rôle est valide
      const validRoles = [
        'Photographe', 'Caterer', 'Venue Manager', 'DJ', 'Florist', 
        'Event Planner', 'Videographer', 'Makeup Artist', 'Hair Stylist',
        'Security', 'Waiter', 'Decorator', 'Lighting Technician', 
        'Sound Engineer', 'Transporter', 'Other'
      ];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Rôle invalide.' });
      }

      // Vérifier si un prestataire avec le même email existe déjà
      Prestataire.findByEmail(email, (err, existingPrestataire) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (existingPrestataire) {
          return res.status(400).json({ message: 'Un prestataire avec cet email existe déjà.' });
        }

        // Ajouter le prestataire dans la base de données
        Prestataire.create({
          first_name,
          familly_name,
          email,
          password,
          role, // Rôle sélectionné
          service, 
          description,
          bio,
        }, (err, result) => {
          if (err) {
            console.error('Erreur lors de l’insertion des données :', err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
          }

          res.status(201).json({
            message: 'Inscription réussie.',
            prestataire: {
              id_prestataire: result.insertId,
              first_name,
              familly_name,
              email,
              role,
              service,
              description,
              bio,
            },
          });
        });
      });
    });
  },
};

module.exports = signuppresController;
