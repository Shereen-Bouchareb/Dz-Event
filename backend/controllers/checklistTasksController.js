const ChecklistTask = require('../models/checklistTaskModel');

exports.getPrestataireChecklist = async (req, res) => {
    const prestataireId = req.user.id;   
  
    try {
      const checklistTasks = await ChecklistTask.getPrestataireChecklist(prestataireId);
      res.status(200).json({ checklistTasks }); 
    } catch (error) {
      // Handle errors here
      console.error('Erreur lors de la récupération des tâches de la checklist :', error.message);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };
  
exports.AddPrestataireChecklist = async (req, res) => {
  const { task_name } = req.body;  
  const prestataireId = req.user.id;    

  if (!task_name ) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const result = await ChecklistTask.AddPrestataireChecklist(prestataireId, task_name);
    
    res.status(201).json({ message: 'Tâche ajoutée avec succès.', taskId: result.insertId });   
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche à la checklist :', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};



exports.deletePrestataireChecklist = async (req, res) => {
  const { task_id } = req.body;    

  const prestataireId = req.user.id;   

  if (!task_id) {   
    return res.status(400).json({ message: 'ID de la tâche est requis.' });
  }

  try {
    const result = await ChecklistTask.deletePrestataireChecklist(task_id, prestataireId);
    
    if (result.affectedRows === 0) {    
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }
    
    res.status(200).json({ message: 'Tâche supprimée avec succès.' });   
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }

};


