const db = require('../config/db');

exports.getPrestataireById = async (id) => {
    const query = `
        SELECT 
            p.Prestataire_id AS id,
            p.firstname,
            p.familyname,
            p.userBio,
            p.Job_description,
            COALESCE(AVG(c.rating), 0) AS rating
        FROM Prestataire p
        LEFT JOIN services s ON s.Prestataire_id = p.Prestataire_id
        LEFT JOIN reserver r ON r.service_id = s.service_id
        LEFT JOIN commentaire c ON c.client_id = r.client_id
        WHERE p.Prestataire_id = ?
        GROUP BY p.Prestataire_id;
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0]; // Retourne le premier résultat ou `undefined`
};

exports.submitComment = async (prestataireId, rating, content, clientId) => {
    const query = `
        INSERT INTO commentaire (rating, content, client_id, prestataire_id) 
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await db.execute(query, [rating, content, clientId, prestataireId]);
    return result; 
};

exports.getPrestataireCommentsByClient = async (prestataireId) => {
    const query = `
        SELECT c.comment_id, c.created_at, c.content, c.rating, cl.firstName, cl.familyName
        FROM commentaire c
        JOIN client cl ON c.client_id = cl.client_id
        JOIN prestataire p ON c.prestataire_id = p.prestataire_id
        WHERE p.prestataire_id = ?
        ORDER BY c.created_at DESC
        LIMIT 0, 25;
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
};

exports.getPrestataireServicesByClient = async (prestataireId) => {
    const query = `
        SELECT service_id, service_name, ser_description, price
        FROM services
        WHERE prestataire_id = ?;
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
};

exports.getPrestataireGalleryByClient = async (prestataireId) => {
    const query = `
        SELECT picture_id, url, uploaded_at
        FROM Pictures
        WHERE Prestataire_id = ?;
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
};

exports.getCheckListTasks = async (prestataireId) => {
    try {
        const query = `
            SELECT t.*
            FROM checklistTasks t
            WHERE t.Prestataire_id = ?;
        `;
        const [rows] = await db.execute(query, [prestataireId]);
        return rows;
    } catch (error) {
        throw new Error('Error fetching checklist tasks from the database: ' + error.message);
    }
};

exports.submitReservationForm = async (formData) => {
    const { clientId, address, wilaya, num_tel, createdAt } = formData;
    

    try {
        const query = `
            INSERT INTO reservationform (address, wilaya, num_tel, created_at, client_id)
            VALUES (?, ?, ?, ?, ?);
        `;
        const [result] = await db.execute(query, [address, wilaya, num_tel, createdAt, clientId]);

        return {
            formId: result.insertId, // Auto-incremented ID of the form
            address,
            wilaya,
            num_tel,
            createdAt,
        };
    } catch (error) {
        throw new Error('Error submitting reservation form: ' + error.message);
    }
};


exports.insertEventDate = async (eventDate) => {
    try {
        // Check if the event date already exists
        const findQuery = `SELECT event_date_id FROM eventdate WHERE event_date = ?`;
        const [findResult] = await db.execute(findQuery, [eventDate]);

        if (findResult.length > 0) {
            // If the event date exists, return its ID
            return findResult[0].event_date_id;
        }

        // If not, insert the new event date
        const insertQuery = `INSERT INTO eventdate (event_date) VALUES (?)`;
        const [insertResult] = await db.execute(insertQuery, [eventDate]);

        return insertResult.insertId; // Return the new event_date_id
    } catch (error) {
        throw new Error('Error inserting or retrieving event date: ' + error.message);
    }
};

exports.insertReservation = async (reservationData) => {
    const { serviceId, clientId, eventDateId, reservedAt, reservation_status } = reservationData;

    try {
        const query = `
            INSERT INTO reserver (service_id, client_id, event_date_id, reserved_at, reservation_status)
            VALUES (?, ?, ?, ?, ?);
        `;
        const [result] = await db.execute(query, [serviceId, clientId, eventDateId, reservedAt, reservation_status]);

        return result.insertId; // Return the new reservation ID
    } catch (error) {
        throw new Error('Error inserting reservation: ' + error.message);
    }
};


exports.getAllPrestataire = async () => {
    const query = `
        SELECT 
            p.Prestataire_id AS id,
            p.firstname,
            p.familyname,
            p.userBio,
            p.Job_description,
            COALESCE(AVG(c.rating), 0) AS rating
        FROM Prestataire p
        LEFT JOIN services s ON s.Prestataire_id = p.Prestataire_id
        LEFT JOIN reserver r ON r.service_id = s.service_id
        LEFT JOIN commentaire c ON c.client_id = r.client_id
        GROUP BY p.Prestataire_id;
    `;
    const [rows] = await db.execute(query);
    return rows;
};
