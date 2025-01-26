const prestataireModel = require('../models/prestataireModel');


//getAllPrestataire
exports.getAllPrestataire = async (req, res) => {
    try {

        const prestataires = await prestataireModel.getAllPrestataire(); // Récupérer tous les prestataires
        res.status(200).json({ prestataires }); // Retourne les prestataires
    } catch (err) {
        console.error('Erreur lors de la récupération des prestataires :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};




//getPrestataireById
exports.getPrestataireById = async (req, res) => {
    const prestataireId = req.params.prestataireId; // Récupérer l'ID du prestataire depuis les paramètres

    try {
        const prestataire = await prestataireModel.getPrestataireById(prestataireId); // Appel au modèle

        if (!prestataire) {
            return res.status(404).json({ message: 'Prestataire non trouvé.' });
        }

        res.status(200).json({ prestataire });
    } catch (err) {
        console.error('Erreur lors de la récupération du prestataire :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

exports.submitComment = async (req, res) => {

    const prestataireId = req.params.prestataireId; 
    const { content, rating } = req.body;
    const clientId = req.user.id; 

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

//getPrestataireCommentsByClient
exports.getPrestataireCommentsByClient = async (req, res) => {
    const prestataireId = req.params.prestataireId; 

    try {
        const comments = await prestataireModel.getPrestataireCommentsByClient(prestataireId);
        res.status(200).json({ comments });
    } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

//getPrestataireServicesByClient
exports.getPrestataireServicesByClient = async (req, res) => {
    const prestataireId = req.params.prestataireId; 
    try {
        const services = await prestataireModel.getPrestataireServicesByClient(prestataireId);
        res.status(200).json({ services });
    } catch (error) {
        console.error("Erreur lors de la récupération des services :", error.message);
        res.status(500).json({ message: "Erreur serveur." });
    }
};



//getPrestataireGalleryByClient
exports.getPrestataireGalleryByClient = async (req, res) => {
    const prestataireId = req.params.prestataireId; // ID du prestataire depuis les paramètres

    try {
        const photos = await prestataireModel.getPrestataireGalleryByClient(prestataireId);
        res.status(200).json({ photos });
    } catch (error) {
        console.error('Erreur lors de la récupération des photos :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

//getPrestataireAvailabilityByClient
//getPrestataireByDate


exports.getReservationFormByClient  = async (req, res) => {

    const prestataireId = req.params.prestataireId;

    try {
        const tasks = await prestataireModel.getCheckListTasks(prestataireId);
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Erreur lors de la récupération des checklist tasks  :', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Unable to retrieve checklist tasks.',
            error: error.message
        });
    }
};


exports.submitReservationFormByClient = async (req, res) => {
    const serviceId = req.params.serviceId;
    const { address, wilaya, num_tel, eventDate } = req.body; 
    const clientId = req.user.id;
    const createdAt = new Date(); 
    const reservedAt = new Date(); 
    const reservation_status = 'en attente'; 

    if (!address || !wilaya || !num_tel || !eventDate) {
        return res.status(400).json({
            success: false,
            message: 'All fields (address, wilaya, num_tel, eventDate) are required.',
        });
    }

    try {
        // 1. Insert the event date into eventDate table (or get existing event_date_id)
        const eventDateId = await prestataireModel.insertEventDate(eventDate);

        // 2. Insert into ReservationForm table
        const reservationFormResult = await prestataireModel.submitReservationForm({
            clientId,
            address,
            wilaya,
            num_tel,
            createdAt,
        });

        // 3. Insert into reserver table
        await prestataireModel.insertReservation({
            serviceId,
            clientId,
            eventDateId,
            reservedAt,
            reservation_status,
        });

        res.status(201).json({
            success: true,
            message: 'Reservation form and reservation submitted successfully.',
            data: {
                reservationFormId: reservationFormResult.formId,
                eventDateId,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error. Unable to submit the reservation.',
            error: error.message,
        });
    }
};

