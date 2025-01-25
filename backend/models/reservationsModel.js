const db = require('../config/db');

// for clients 


exports.getReservationsByClientId = async (clientId) => {
    try {
        const query = `
            SELECT 
                r.reservation_id, 
                r.service_id, 
                r.client_id, 
                r.event_date_id, 
                r.reserved_at, 
                r.reservation_status, 
                e.event_date, 
                rf.address, 
                rf.willaya, 
                s.service_name, 
                p.firstName AS prestataire_first_name, 
                p.familyName AS prestataire_last_name, 
                p.role AS prestataire_role
            FROM 
                reserver r
            JOIN 
                eventdate e ON r.event_date_id = e.event_date_id
            JOIN 
                ReservationFrom rf 
                    ON r.client_id = rf.client_id 
                    AND DATE(r.reserved_at) = DATE(rf.created_at)  -- Ensure the dates are close (same day)
            JOIN 
                services s ON r.service_id = s.service_id
            JOIN 
                prestataire p ON s.Prestataire_id = p.prestataire_id
            WHERE 
                r.client_id = ?
        `;

        const [results] = await db.execute(query, [clientId]);

        return results; // Return the results with the joined data
    } catch (error) {
        throw new Error('Error retrieving reservations: ' + error.message);
    }
};

// for prestataire
