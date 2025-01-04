const db = require('../config/db');

// Ajouter un service
const addService = async (name, description, price, prestataireId) => {
  const query = `
    INSERT INTO services (service_name, ser_description, price, prestataire_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(query, [name, description, price, prestataireId]);
  return result;
};

// Récupérer les services d'un prestataire
const getServicesByPrestataire = async (prestataireId) => {
  const query = `
    SELECT service_id, service_name, ser_description, price
    FROM services
    WHERE prestataire_id = ?
  `;
  const [rows] = await db.execute(query, [prestataireId]);
  return rows;
};

// Mettre à jour un service
const updateService = async (id, name, description, price) => {
  const query = `
    UPDATE services
    SET service_name = ?, ser_description = ?, price = ?
    WHERE service_id = ?
  `;
  const [result] = await db.execute(query, [name, description, price, id]);
  return result;
};

// Supprimer un service
const deleteService = async (id) => {
  const query = `
    DELETE FROM services
    WHERE service_id = ?
  `;
  const [result] = await db.execute(query, [id]);
  return result;
};

module.exports = {
  addService,
  getServicesByPrestataire,
  updateService,
  deleteService,
};
