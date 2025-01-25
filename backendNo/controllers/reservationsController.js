const userQueries = require('../models/reservationsModel');
// for a client 
exports.getClientReservations = async (req, res) => {
    const clientId = req.user.id; 

    try {

        const reservations = await userQueries.getClientReservations(clientId);

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
exports.getPendingReservation  = async (req, res) => {
    const clientId = req.user.id; 

    try {
        const reservations = await reservationModel.getReservationsByClient(clientId);
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

exports.acceptReservation= async (req, res) => {
    const clientId = req.user.id; 

    try {
        const reservations = await reservationModel.getReservationsByClient(clientId);
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

exports.rejectReservation= async (req, res) => {
    const clientId = req.user.id; 

    try {
        const reservations = await reservationModel.getReservationsByClient(clientId);
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
