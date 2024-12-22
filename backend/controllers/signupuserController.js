//crée un contrôleur qui gère la logique d'inscription de l'utilisateur 
const Client = require('../models/signupuserModel');

const signUp = async (req, res) => {
    const { firstName, familyName, GmailAd, password, confirmPassword } = req.body;

    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    // Vérification si l'email existe déjà
    const existingClient = await Client.findByEmail(GmailAd);
    if (existingClient) {
        return res.status(400).json({ message: "Un client avec cet email existe déjà." });
    }

    try {
        // Enregistrement du client (mot de passe non haché)
        await Client.create(firstName, familyName, GmailAd, password);
        res.status(201).json({ message: "Inscription réussie !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
};

module.exports = { signUp };

