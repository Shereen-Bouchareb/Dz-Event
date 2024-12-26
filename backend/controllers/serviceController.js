const Service = require('../models/servicesModel');

// Ajouter un service
exports.addPrestataireService = async (req, res) => {
  const { service_name, ser_description, price } = req.body;     // Extraire les informations du service depuis le corps de la requête (req.body)
  const prestataireId = req.user.id; // Récupérer l'ID du prestataire depuis le token

  if (!service_name || !ser_description || !price) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' }); // Vérification que tous les champs nécessaires sont fournis
  }

  try {
    const result = await Service.addPrestataireService(service_name, ser_description, price, prestataireId);
    res.status(201).json({ message: 'Service ajouté avec succès.', serviceId: result.insertId });   // Si l'ajout est réussi, envoyer une réponse avec un code 201 et l'ID du service ajouté
  } catch (error) {
    // Si une erreur survient, logguer l'erreur et envoyer une réponse avec un code 500
    console.error('Erreur lors de l ajout du service :', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer les services d'un prestataire
exports.getPrestataireServices = async (req, res) => {
  const prestataireId = req.user.id; // Utiliser l'ID du prestataire dans le token

  try {
    const services = await Service.getPrestataireServices(prestataireId);
    res.status(200).json({ services });  // Si la récupération réussit, envoyer une réponse avec un code 200 et les services récupérés
  } catch (error) {
    console.error('Erreur lors de la récupération des services :', error.message);     // Si une erreur survient, logguer l'erreur et envoyer une réponse avec un code 500
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un service
exports.deletePrestataireService = async (req, res) => {
  const { service_id } = req.body; // Récupérer l'ID du service à supprimer
  const prestataireId = req.user.id; // Récupérer l'ID du prestataire dans le token

  if (!service_id) {
    return res.status(400).json({ message: 'ID du service est requis.' });
  }

  try {
    const result = await Service.deletePrestataireService(service_id);
    if (result.affectedRows === 0) {     // Vérifier si le service a été supprimé (affectedRows = 0 signifie que le service n'a pas été trouvé)
      return res.status(404).json({ message: 'Service non trouvé.' });
    }
    res.status(200).json({ message: 'Service supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du service :', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
module.exports = serviceController;