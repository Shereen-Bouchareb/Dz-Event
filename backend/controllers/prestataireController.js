const prestataireController = require('../models/prestataireModel');

// Récupérer tous les prestataires
exports.getAllPrestataire = async (_, res) => {
    try {
        const prestataires = await prestataireController.getAllPrestataire(); // Récupérer tous les prestataires
        res.status(200).json({ prestataires }); // Retourne les prestataires
    } catch (err) {
        console.error('Erreur lors de la récupération des prestataires :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};


// Récupérer un prestataire par ID (utilisé dans l'URL)
exports.getPrestataireById = async (req, res) => {
    const prestataireId = req.params.prestataireId; // Récupérer l'ID du prestataire depuis les paramètres

    try {
        const prestataire = await prestataireController.getPrestataireById(prestataireId); // Appel au modèle

        if (!prestataire) {
            return res.status(404).json({ message: 'Prestataire non trouvé.' });
        }

        res.status(200).json({ prestataire });
    } catch (err) {
        console.error('Erreur lors de la récupération du prestataire :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// Récupérer les commentaires d'un prestataire
exports.getPrestataireCommentsByClient = async (req, res) => {
    const prestataireId = req.params.prestataireId; // ID du prestataire depuis les paramètres

    try {
        const comments = await prestataireController.getPrestataireCommentsByClient(prestataireId);
        res.status(200).json({ comments });
    } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// Ajouter un commentaire pour un prestataire
exports.submitComment = async (req, res) => {
    const prestataireId = req.params.prestataireId; // ID du prestataire depuis les paramètres
    const { content, rating } = req.body; // Contenu et note du commentaire
    const clientId = req.user.clientId; // ID du client depuis le token

    if (!content || rating === undefined) {
        return res.status(400).json({ message: 'Le contenu et la note sont requis.' });
    }

    try {
        const result = await prestataireController.submitComment(prestataireId, rating, content, clientId);
        res.status(201).json({ message: 'Commentaire ajouté avec succès.', commentId: result.insertId });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// Mettre à jour le rating d'un commentaire spécifique
exports.updateRating = async (req, res) => {
    const { commentId } = req.params; // ID du commentaire
    const { rating } = req.body; // Nouvelle note

    if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
    }

    try {
        const result = await prestataireController.updateRating(commentId, rating);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Commentaire non trouvé." });
        }

        return res.status(200).json({ message: "Rating du commentaire mis à jour avec succès.", newRating: rating });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

// Récupérer le rating moyen de tous les prestataires
exports.getAverageRating = async (_, res) => {
    try {
        const averageRating = await prestataireController.getAverageRating();
        return res.status(200).json({ averageRating });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

// Récupérer les services d'un prestataire
exports.getServicesByPrestataire = async (req, res) => {
    const prestataireId = req.params.prestataireId; // ID du prestataire depuis les paramètres

    try {
        const services = await prestataireController.getPrestataireServicesByClient(prestataireId);
        res.status(200).json({ services });
    } catch (error) {
        console.error("Erreur lors de la récupération des services :", error.message);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Récupérer toutes les photos
exports.getPrestataireGalleryByClient = async (req, res) => {
    const prestataireId = req.params.prestataireId; // ID du prestataire depuis les paramètres

    try {
        const photos = await prestataireController.getPrestataireGalleryByClient(prestataireId);
        res.status(200).json({ photos });
    } catch (error) {
        console.error('Erreur lors de la récupération des photos :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// Exporter directement les fonctions
module.exports = {
    getAllPrestataire,
    getPrestataireById,
    getPrestataireCommentsByClient,
    submitComment,
    updateRating,
    getAverageRating,
    getServicesByPrestataire,
    getPrestataireGalleryByClient
};