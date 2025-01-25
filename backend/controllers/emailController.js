const nodemailer = require("nodemailer");
require("dotenv").config();

// Transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Email expéditeur
    pass: process.env.GMAIL_PASS, // Mot de passe d'application Gmail
  },
});

// Contrôleur pour envoyer un email
const envoyerEmail = (req, res) => {
  const { email, question } = req.body;

  if (!email || !question) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const mailOptions = {
    from: email,
    to: "y_boukrou@estin.dz", // Destinataire
    subject: "Demande de devis",
    text: `Nouvelle demande de devis :\n\nEmail: ${email}\nQuestion: ${question}`,
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      return res.status(500).json({
        message: "Une erreur est survenue lors de l'envoi de l'email.",
        erreur: error.message,
      });
    }
    console.log("Email envoyé avec succès :", info.response);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  });
};

module.exports = { envoyerEmail };
