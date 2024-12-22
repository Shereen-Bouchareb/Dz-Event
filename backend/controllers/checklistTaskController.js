const checklistModel = require('../models/checklistTaskModel');

// Ajouter une tâche
const addTask = async (req, res) => {
  const { taskName, prestataireId } = req.body;

  if (!taskName || !prestataireId) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont requis.",
    });
  }

  try {
    await checklistModel.addTask(taskName, prestataireId);
    res.status(201).json({
      success: true,
      message: "Tâche ajoutée avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de l’ajout de la tâche :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// Récupérer les tâches d'un prestataire
const getTasks = async (req, res) => {
  const { prestataireId } = req.params;

  try {
    const tasks = await checklistModel.getTasksByPrestataire(prestataireId);
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await checklistModel.deleteTask(taskId);
    res.status(200).json({
      success: true,
      message: "Tâche supprimée avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
};
