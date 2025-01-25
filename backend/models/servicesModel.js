
const db = require('../config/db');
// Ajouter un service
const addPrestataireService = async (name, description, price, prestataireId) => {
  try {
    const query = `
      INSERT INTO services (service_name, ser_description, price, Prestataire_id)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, description, price, prestataireId]);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'ajout du service:", error);
    throw error;
  }
};

// Récupérer les services d'un prestataire
const getPrestataireServices = async (prestataireId) => {
  try {
    const query = `
      SELECT service_id, service_name, ser_description, price
      FROM services
      WHERE Prestataire_id = ?
    `;
    const [rows] = await db.execute(query, [prestataireId]);
    return rows;
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    throw error;
  }
};

// Supprimer un service
const deletePrestataireService = async (id) => {
  try {
    const query = `
      DELETE FROM services
      WHERE service_id = ?
    `;
    const [result] = await db.execute(query, [id]);
    return result;
  } catch (error) {
    console.error("Erreur lors de la suppression du service:", error);
    throw error;
  }
};

module.exports = {
  getPrestataireServices,
  addPrestataireService,
  deletePrestataireService
};
