const Service = require('../models/servicesModel');

// Ajouter un service
exports.addPrestataireService = async (req, res) => {
  const { service_name, ser_description, price } = req.body;
  const prestataireId = req.user.id; 

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




exports.getPrestataireServices = async (req, res) => {
  const prestataireId = req.user.id; 

  try {
    const services = await Service.getPrestataireServices(prestataireId);
    res.status(200).json({ services }); 
  } catch (error) {
    console.error('Erreur lors de la récupération des services :', error.message);     
  }
};




exports.deletePrestataireService = async (req, res) => {
    const serviceId = req.params.serviceId;
    const prestataireId = req.user.id; // Extract prestataire's ID from the token or session

    try {
        const result = await Service.deletePrestataireService(serviceId, prestataireId);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error.message);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};