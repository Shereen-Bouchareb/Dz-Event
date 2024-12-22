const serviceModel = require('../models/serviceModel');

// Ajouter un service
const addService = async (req, res) => {
  const { name, description, price, prestataireId } = req.body;

  if (!name || !description || !price || !prestataireId) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont requis.",
    });
  }

  try {
    await serviceModel.addService(name, description, price, prestataireId);
    res.status(201).json({
      success: true,
      message: "Service ajouté avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de l’ajout du service :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// Récupérer les services d'un prestataire
const getServices = async (req, res) => {
  const { prestataireId } = req.params;

  try {
    const services = await serviceModel.getServicesByPrestataire(prestataireId);
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des services :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// Mettre à jour un service
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont requis.",
    });
  }

  try {
    await serviceModel.updateService(id, name, description, price);
    res.status(200).json({
      success: true,
      message: "Service mis à jour avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// Supprimer un service
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await serviceModel.deleteService(id);
    res.status(200).json({
      success: true,
      message: "Service supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du service :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  addService,
  getServices,
  updateService,
  deleteService,
};
