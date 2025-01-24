const db = require("../config/db");

// Vérifier la disponibilité
const checkAvailability = async (Prestataire_id, event_date) => {
  const query =
    "SELECT * FROM availability WHERE Prestataire_id = ? AND date = ? AND status = 'Available'";
  const [availability] = await db
    .promise()
    .query(query, [Prestataire_id, event_date]);
  return availability;
};

// Créer une réservation
const createReservation = async (client_id, Prestataire_id, event_date_id) => {

  const query =
    "INSERT INTO reserver (client_id, Prestataire_id, event_date_id, reservation_status) VALUES (?, ?, ?, 'en attente')";
  const [result] = await db
    .promise()
    .query(query, [client_id, Prestataire_id, event_date_id]);
  return result;
};

// Mettre à jour l'état d'une réservation
const updateReservationStatus = async (reservation_status, id) => {
  const query = "UPDATE reserver SET reservation_status = ? WHERE id = ?";
  const [result] = await db.promise().query(query, [reservation_status, id]);
  return result;
};

// Mettre à jour la disponibilité
const updateAvailabilityStatus = async (Prestataire_id, event_date) => {
  const query =
    "UPDATE availability SET status = 'Unavailable' WHERE Prestataire_id = ? AND date = ?";
  const [result] = await db
    .promise()
    .query(query, [Prestataire_id, event_date]);
  return result;
};

// Obtenir les détails d'une réservation
const getReservationById = async (id) => {
  const query = "SELECT * FROM reserver WHERE id = ?";
  const [reservation] = await db.promise().query(query, [id]);
  return reservation;
};

// Exporter toutes les fonctions
module.exports = {
  checkAvailability,
  createReservation,
  updateReservationStatus,
  updateAvailabilityStatus,
  getReservationById,
};
