const prestataireModel = require('../models/prestataireModel');

// getAllPrestataire
exports.getAllPrestataire = async (req, res) => {
    try {
        const prestataires = await prestataireModel.getAllPrestataire();
        res.status(200).json({ prestataires });
    } catch (err) {
        console.error('Erreur lors de la récupération des prestataires :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// getPrestataireById
exports.getPrestataireById = async (req, res) => {
    const { prestataireId } = req.params;

    try {
        const prestataire = await prestataireModel.getPrestataireById(prestataireId);

        if (!prestataire) {
            return res.status(404).json({ message: 'Prestataire non trouvé.' });
        }

        res.status(200).json({ prestataire });
    } catch (err) {
        console.error('Erreur lors de la récupération du prestataire :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// submitComment
exports.submitComment = async (req, res) => {
    const { prestataireId } = req.params;
    const { content, rating } = req.body;
    const clientId = req.user?.id;

    if (!content || rating === undefined) {
        return res.status(400).json({ message: 'Le contenu et la note sont requis.' });
    }

    try {
        const result = await prestataireModel.submitComment(prestataireId, rating, content, clientId);
        res.status(201).json({ message: 'Commentaire ajouté avec succès.', commentId: result.insertId });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// getPrestataireCommentsByClient
exports.getPrestataireCommentsByClient = async (req, res) => {
    const { prestataireId } = req.params;

    try {
        const comments = await prestataireModel.getPrestataireCommentsByClient(prestataireId);
        res.status(200).json({ comments });
    } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// getPrestataireServicesByClient
exports.getPrestataireServicesByClient = async (req, res) => {
    const { prestataireId } = req.params;

    try {
        const services = await prestataireModel.getPrestataireServicesByClient(prestataireId);
        res.status(200).json({ services });
    } catch (err) {
        console.error('Erreur lors de la récupération des services :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// getPrestataireGalleryByClient
exports.getPrestataireGalleryByClient = async (req, res) => {
    const { prestataireId } = req.params;

    try {
        const photos = await prestataireModel.getPrestataireGalleryByClient(prestataireId);
        res.status(200).json({ photos });
    } catch (err) {
        console.error('Erreur lors de la récupération des photos :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

// getReservationFormByClient
exports.getReservationFormByClient = async (req, res) => {
    const { prestataireId } = req.params;

    try {
        const tasks = await prestataireModel.getCheckListTasks(prestataireId);
        res.status(200).json({ tasks });
    } catch (err) {
        console.error('Erreur lors de la récupération des tâches de la checklist :', err.message);
        res.status(500).json({
            message: 'Erreur interne du serveur.',
            error: err.message
        });
    }
};

// submitReservationFormByClient
exports.submitReservationFormByClient = async (req, res) => {
    const { prestataireId, serviceId } = req.params;
    const { address, willaya, num_tel, eventDate } = req.body;
    const clientId = req.user?.id;
    const createdAt = new Date();
    const reservedAt = new Date();
    const reservationStatus = 'en attente';

    if (!address || !willaya || !num_tel || !eventDate) {
        return res.status(400).json({
            message: 'Tous les champs (address, willaya, num_tel, eventDate) sont requis.'
        });
    }

    try {
        // Insérer la date de l'événement
        const eventDateId = await prestataireModel.insertEventDate(eventDate);

        // Insérer dans ReservationForm
        const reservationFormResult = await prestataireModel.submitReservationForm({
            clientId,
            address,
            willaya,
            num_tel,
            createdAt
        });

        // Insérer dans Reserver
        await prestataireModel.insertReservation({
            serviceId,
            clientId,
            eventDateId,
            reservedAt,
            reservationStatus
        });

        res.status(201).json({
            message: 'Formulaire de réservation soumis avec succès.',
            data: {
                reservationFormId: reservationFormResult.formId,
                eventDateId
            }
        });
    } catch (err) {
        console.error('Erreur lors de la soumission du formulaire de réservation :', err.message);
        res.status(500).json({
            message: 'Erreur interne du serveur.',
            error: err.message
        });
    }
};
