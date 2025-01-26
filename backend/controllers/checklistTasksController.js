const ChecklistTask = require("../models/checklistTaskModel");

const checklistTasksController = {};

// Récupérer la checklist d'un prestataire
checklistTasksController.getPrestataireChecklist = async (req, res) => {
  const prestataireId = req.user.prestataireId; // Récupérer l'ID du prestataire depuis le token JWT

  try {
    const checklistTasks = await ChecklistTask.getPrestataireChecklist(
      prestataireId
    );
    res.status(200).json({ checklistTasks }); // Si la récupération réussit, envoyer une réponse avec un code 200 et les tâches récupérées
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des tâches de la checklist :",
      error.message
    );
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Ajouter une tâche à la checklist d'un prestataire
checklistTasksController.AddPrestataireChecklist = async (req, res) => {
  const { task_name, description, deadline } = req.body; // Extraire les informations nécessaires pour la tâche depuis le corps de la requête
  const prestataireId = req.user.id; // Récupérer l'ID du prestataire depuis le token JWT

  if (!task_name || !description || !deadline) {
    // Vérification que toutes les informations nécessaires sont présentes
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const result = await ChecklistTask.AddPrestataireChecklist(
      prestataireId,
      task_name,
      description,
      deadline
    );
    res
      .status(201)
      .json({ message: "Tâche ajoutée avec succès.", taskId: result.insertId }); // Si l'ajout est réussi
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de la tâche à la checklist :",
      error.message
    );
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Supprimer une tâche de la checklist d'un prestataire
checklistTasksController.deletePrestataireChecklist = async (req, res) => {
  const { task_id } = req.body; // Extraire l'ID de la tâche à supprimer depuis le corps de la requête

  const prestataireId = req.user.id; // Récupérer l'ID du prestataire depuis le token JWT

  if (!task_id) {
    // Vérification que l'ID de la tâche est fourni
    return res.status(400).json({ message: "ID de la tâche est requis." });
  }

  try {
    const result = await ChecklistTask.deletePrestataireChecklist(
      task_id,
      prestataireId
    );

    if (result.affectedRows === 0) {
      // Vérifier si la tâche a été supprimée
      return res.status(404).json({ message: "Tâche non trouvée." });
    }

    res.status(200).json({ message: "Tâche supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

module.exports = checklistTasksController;
