const {
  checkAvailability,
  createReservation: createReservationModel,
  updateReservationStatus,
  updateAvailabilityStatus,
  getReservationById,
} = require("../models/reservationsModel");

// Créer une réservation
exports.creerReservation = async (req, res) => {
  const { client_id, Prestataire_id, event_date } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Récupérer ou créer l'ID de l'event_date
    let [dateRows] = await connection.query(
      "SELECT event_date_id FROM eventdate WHERE event_date = ?",
      [event_date]
    );

    let event_date_id;
    if (dateRows.length === 0) {
      const [result] = await connection.query(
        "INSERT INTO eventdate (event_date) VALUES (?)",
        [event_date]
      );
      event_date_id = result.insertId;
    } else {
      event_date_id = dateRows[0].event_date_id;
    }

    // Vérifier la disponibilité
    const availability = await checkAvailability(Prestataire_id, event_date);
    if (availability.length === 0) {
      throw new Error("Le prestataire n'est pas disponible à cette date.");
    }

    // Créer la réservation
    const result = await createReservationModel(
      client_id,
      Prestataire_id,
      event_date_id
    );

    // Mettre à jour la disponibilité
    await connection.query(
      'UPDATE availability SET status = "Unavailable" WHERE Prestataire_id = ? AND date = ?',
      [Prestataire_id, event_date]
    );

    await connection.commit();
    res.status(201).send({ message: "Réservation créée avec succès", result });
  } catch (error) {
    await connection.rollback();
    res.status(500).send({ error: error.message });
  } finally {
    connection.release();
  }
};

// Mettre à jour l'état d'une réservation
exports.updateEtatReservation = async (req, res) => {
  const { id } = req.params;
  const { reservation_status } = req.body;

  if (!reservation_status) {
    return res
      .status(400)
      .send({ message: "Le statut de réservation est requis." });
  }

  try {
    const result = await updateReservationStatus(reservation_status, id);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "Réservation introuvable ou déjà traitée." });
    }

    if (reservation_status === "accepté") {
      const reservation = await getReservationById(id);
      await updateAvailabilityStatus(
        reservation.Prestataire_id,
        reservation.event_date_id
      );
    }

    res.send({
      message:
        reservation_status === "accepté"
          ? "Réservation acceptée et disponibilité mise à jour."
          : "État de la réservation mis à jour.",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
