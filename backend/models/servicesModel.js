
const db = require('../config/db');


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



const deletePrestataireService = async (serviceId, prestataireId) => {
  try {
      // SQL query to delete the service
      const query = `
          DELETE FROM services
          WHERE service_id = ? AND Prestataire_id = ?
      `;
      
      const [result] = await db.execute(query, [serviceId, prestataireId]);

      // Check if the service was deleted (result.affectedRows > 0 indicates successful deletion)
      if (result.affectedRows === 0) {
          throw new Error('Service not found or you do not have permission to delete this service');
      }

      return result; // Return the result to the controller
  } catch (error) {
      throw new Error('Error deleting service: ' + error.message);
  }
};

module.exports = {
  getPrestataireServices,
  addPrestataireService,
  deletePrestataireService
};
