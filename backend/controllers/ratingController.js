const ratingModel = require('../models/ratingModel');

// Récupérer tous les prestataires avec leur rating moyen
const getAllPrestataires = async (req, res) => {
    try {
        const prestataires = await ratingModel.getAllPrestataires();
        return res.status(200).json({ success: true, data: prestataires });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({ success: false, message: "Erreur serveur." });
    }
};


// Mettre à jour le rating d'un commentaire spécifique
const updateRating = async (req, res) => {
    const { commentId } = req.params;  // ID du commentaire
    const { rating } = req.body;       // Nouvelle note

    // Validation de la note
    if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({
            success: false, 
            message: "La note doit être comprise entre 0 et 5."
        });
    }

    try {
        // Appeler le modèle pour mettre à jour le rating du commentaire
        const result = await ratingModel.updateRating(commentId, rating);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false, 
                message: "Commentaire non trouvé."
            });
        }
        return res.status(200).json({
            success: true, 
            message: "Rating du commentaire mis à jour avec succès.", 
            newRating: rating
        });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({
            success: false, 
            message: "Erreur serveur."
        });
    }
};

// Récupérer le rating moyen de tous les prestataires
const getAverageRating = async (req, res) => {
    try {
        const averageRating = await ratingModel.getAverageRating();
        return res.status(200).json({ 
            success: true, 
            averageRating 
        });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Erreur serveur." 
        });
    }
};

// Récupérer un prestataire par son ID, avec son rating moyen
const getPrestataireById = async (req, res) => {
    const { id } = req.params;
    try {
        const prestataire = await ratingModel.getPrestataireById(id);
        if (!prestataire) {
            return res.status(404).json({ success: false, message: "Prestataire non trouvé." });
        }
        return res.status(200).json({ success: true, data: prestataire });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({ success: false, message: "Erreur serveur." });
    }
};

// Ajouter un commentaire avec un rating pour un prestataire
const addCommentaire = async (req, res) => {
    const { id } = req.params; // ID du prestataire
    const { rating, content, client_id } = req.body; // Rating, contenu du commentaire et ID du client

    // Validation des données
    if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({
            success: false, 
            message: "La note doit être comprise entre 0 et 5."
        });
    }
    if (!content || content.trim() === '') {
        return res.status(400).json({
            success: false, 
            message: "Le contenu du commentaire est requis."
        });
    }
    if (!client_id) {
        return res.status(400).json({
            success: false, 
            message: "L'ID du client est requis."
        });
    }

    try {
        // Appeler le modèle pour ajouter le commentaire
        const result = await ratingModel.addCommentaire(id, rating, content, client_id);
        return res.status(201).json({
            success: true, 
            message: "Commentaire ajouté avec succès.",
            data: { comment_id: result.insertId, rating, content, client_id }
        });
    } catch (error) {
        console.error("Erreur :", error.message);
        return res.status(500).json({
            success: false, 
            message: "Erreur serveur."
        });
    }
};


module.exports = { 
    getAllPrestataires, 
    updateRating, 
    getAverageRating, 
    getPrestataireById,
    addCommentaire 
};
