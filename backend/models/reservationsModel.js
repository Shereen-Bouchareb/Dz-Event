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
exports.getPrestataireReservations = async (prestataireId) => {
    try {
        const query = `
            SELECT  DISTINCT
                r.event_id,
                r.service_id,
                r.client_id,
                r.reserved_at AS reservation_date,
                r.reservation_status,
                rf.wilaya,
                rf.address,
                s.service_name,
                c.firstName AS client_first_name,
                c.familyName AS client_last_name,
                c.GmailAd AS client_email
            
            FROM
                reserver r
            JOIN
                reservationform rf ON r.client_id = rf.client_id
            JOIN
                services s ON r.service_id = s.service_id
            JOIN
                client c ON r.client_id = c.client_id
            WHERE
                s.Prestataire_id = ?
            ORDER BY
                r.reserved_at DESC
        `;

        const [results] = await db.execute(query, [prestataireId]);

        return results; // Return all reservations for the prestataire
    } catch (error) {
        throw new Error('Error retrieving reservations: ' + error.message);
    }
};

exports.updateReservationStatus = async (eventId, serviceId, clientId, status) => {
    try {
        console.log(clientId,serviceId, eventId)
        const query = `
            UPDATE reserver
            SET reservation_status = ?
            WHERE event_date_id = ? AND service_id = ? AND client_id = ?;
        `;
        
        const [result] = await db.execute(query, [status, eventId, serviceId, clientId]);

        if (result.affectedRows === 0) {
            throw new Error("Reservation not found or no changes made.");
        }

        return { message: `Reservation ${status} successfully.` };
    } catch (error) {
        throw new Error("Error updating reservation status: " + error.message);
    }
};