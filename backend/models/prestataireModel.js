const db = require('../config/db');

// Fonction pour récupérer tous les prestataires de manière asynchrone
const getAllPrestataire = async () => {
    const query = `
        SELECT 
            Prestataire.Prestataire_id AS id,
            Prestataire.firstname,
            Prestataire.familyname,
            Prestataire.userBio,
            Prestataire.Job_description,
            COALESCE(AVG(Commentaire.rating), 0) AS rating
        FROM Prestataire
        LEFT JOIN Commentaire ON Prestataire.Prestataire_id = Commentaire.prestataire_id
        GROUP BY Prestataire.Prestataire_id;
    `;
    const [rows] = await db.execute(query);
    return rows;
};

// Mettre à jour le rating d'un commentaire spécifique dans la table Commentaire
const updateRating = async (commentId, newRating) => {
    const query = `
        UPDATE Commentaire
        SET rating = ?
        WHERE comment_id = ?;
    `;
    const [result] = await db.execute(query, [newRating, commentId]);
    return result;
};

// Calculer le rating moyen de tous les prestataires
const getAverageRating = async () => {
    const query = `
        SELECT AVG(rating) AS averageRating
        FROM Commentaire;
    `;
    const [rows] = await db.execute(query);
    return rows[0]?.averageRating || null; // Retourne `null` si aucune note n'est disponible
};

// Récupérer un prestataire par son ID
const getPrestataireById = async (id) => {
    const query = `
        SELECT 
            Prestataire.Prestataire_id AS id,
            Prestataire.firstname,
            Prestataire.familyname,
            Prestataire.userBio,
            Prestataire.Job_description,
            COALESCE(AVG(Commentaire.rating), 0) AS rating
        FROM Prestataire
        LEFT JOIN Commentaire ON Prestataire.Prestataire_id = Commentaire.prestataire_id
        WHERE Prestataire.Prestataire_id = ?
        GROUP BY Prestataire.Prestataire_id;
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0]; // Retourne le premier résultat ou `undefined`
};

// Ajouter un commentaire avec un rating pour un prestataire
const submitComment = async (prestataireId, rating, content, clientId) => {
    const query = `
        INSERT INTO Commentaire (rating, content, client_id, prestataire_id) 
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await db.execute(query, [rating, content, clientId, prestataireId]);
    return result; // Retourne l'objet result qui contient des informations sur l'insertion (comme insertId)
};

// Récupérer toutes les photos
const getPrestataireGalleryByClient = async (prestataireId) => {
    const query = `
        SELECT picture_id, url, uploaded_at
        FROM Pictures
        WHERE Prestataire_id = ?;
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
};

// Récupérer les services d'un prestataire
const getPrestataireServicesByClient = async (prestataireId) => {
    const query = `
        SELECT service_id, service_name, ser_description, price
        FROM services
        WHERE prestataire_id = ?;
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
};

// Récupérer les avis d'un prestataire
const getPrestataireCommentsByClient = async (prestataireId) => {
    const query = `
        SELECT c.comment_id, c.created_at, c.content, c.rating, cl.firstname, cl.familyname
        FROM Commentaire c
        JOIN Client cl ON c.client_id = cl.client_id
        WHERE c.prestataire_id = ?
        ORDER BY c.created_at DESC;
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
};

// Exporter les fonctions
module.exports = {
    getAllPrestataire,
    getPrestataireById,
    getPrestataireCommentsByClient,
    submitComment,
    getPrestataireServicesByClient,
    getPrestataireGalleryByClient,
    updateRating,
    getAverageRating,
};