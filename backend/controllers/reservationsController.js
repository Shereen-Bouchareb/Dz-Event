const reservationsModel = require('../models/reservationsModel');
// for a client 
exports.getClientReservations = async (req, res) => {
    const clientId = req.user.id; 

    try {

        const reservations = await reservationsModel.getClientReservations(clientId);

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No reservations found for this client.',
            });
        }

        res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error. Unable to fetch reservations.',
            error: error.message,
        });
    }
};


// for a prestataire 
exports.getPrestataireReservations  = async (req, res) => {
    const prestaire_id = req.user.id; 

    try {
        const reservations = await reservationsModel.getPrestataireReservations(prestaire_id);
        res.status(200).json({
            success: true,
            data: reservations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error. Unable to retrieve reservations.',
            error: error.message
        });
    }
};

exports.acceptReservation = async (req, res) => {
    const { reservationId } = req.params; // On récupère l'ID de réservation depuis l'URL
    const status = 'approved';

    try {
        const [eventId, serviceId, clientId] = reservationId.split('-'); // Divise l'ID de réservation en ses composants
        const result = await reservationsModel.updateReservationStatus(eventId, serviceId, clientId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

exports.rejectReservation = async (req, res) => {
    const { reservationId } = req.params; // On récupère l'ID de réservation depuis l'URL
    const status = 'rejected';

    try {
        const [eventId, serviceId, clientId] = reservationId.split('-'); // Divise l'ID de réservation en ses composants
        const result = await reservationsModel.updateReservationStatus(eventId, serviceId, clientId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
