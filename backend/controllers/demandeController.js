const transporter = require("../config/email");

// Fonction pour traiter une demande de devis
exports.envoyerDemandeDevis = async (req, res) => {
  const { nom, email, description, services } = req.body;

  // Vérification des données
  if (!nom || !email || !description || !services) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // Validation du format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "L'email fourni est invalide." });
  }

  // Configurer l'email
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Demande de devis reçue",
    text: `Bonjour ${nom},\n\nNous avons bien reçu votre demande de devis pour les services suivants :\n${services}\n\nDescription du projet :\n${description}\n\nNous reviendrons vers vous dans les plus brefs délais.\n\nCordialement,\nVotre équipe de devis.`,
  };

  // Essayer d'envoyer l'email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", info.response);
    res.status(200).json({
      message: `Merci ${nom}, votre demande de devis a été envoyée avec succès ! Un email de confirmation a été envoyé à ${email}.`,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({
      message:
        "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard.",
      error: error.message,
    });
  }
};
