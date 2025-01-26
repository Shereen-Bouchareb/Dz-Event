const db = require('../config/db');

// for clients 


exports.getClientReservations = async (clientId) => {
    try {
        const query = `
            SELECT
                r.reserved_at AS reservation_date,
                r.reservation_status,
                rf.wilaya,
                rf.address,
                s.service_name,
                p.firstName AS prestataire_first_name,
                p.familyName AS prestataire_last_name,
                p.role AS prestataire_role
            FROM
                reserver r
            JOIN
                reservationform rf ON r.client_id = rf.client_id
            JOIN
                services s ON r.service_id = s.service_id
            JOIN
                prestataire p ON s.Prestataire_id = p.Prestataire_id
            WHERE
                r.client_id = ?
            ORDER BY
                r.reserved_at DESC
        `;

        const [results] = await db.execute(query, [clientId]);

        return results; // Return all relevant fields for the client's reservations
    } catch (error) {
        throw new Error('Error retrieving reservations: ' + error.message);
    }
};


// for prestataire
 