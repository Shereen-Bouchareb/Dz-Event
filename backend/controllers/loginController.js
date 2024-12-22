const LoginModel = require('../models/loginModel');

exports.loginHandler = async (req, res) => {
  const { email, password, rememberMe, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs requis.' });
  }

  try {
    // Vérification de l'utilisateur en fonction du type (client ou prestataire)
    const user = await LoginModel.verifyUser(email, password, userType);

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60; // Durée de session
    const idColumn = userType === 'client' ? 'client_id' : 'Prestataire_id';

    // Réponse avec un cookie et les informations de l'utilisateur
    res.status(200).cookie('id_user', user[idColumn], {
      maxAge: maxAge * 1000,
      httpOnly: true,
    }).json({
      message: 'Connexion réussie.',
      user: {
        id: user[idColumn],
        name: `${user.firstname} ${user.familyname}`, // Nom complet de l'utilisateur
        email: user[userType === 'client' ? 'GmailAd' : 'Gmail_ad'],
        userType,
      },
    });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
