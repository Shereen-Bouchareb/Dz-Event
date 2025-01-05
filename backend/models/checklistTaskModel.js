const db = require('../config/db');

// Ajouter une tâche à la checklist
const AddPrestataireChecklist = async git add .(taskName, prestataireId) => {
  const query = `
    INSERT INTO ChecklistTasks (task_name, Prestataire_id)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(query, [taskName, prestataireId]);
  return result;
};

// Récupérer les tâches d'un prestataire
const getPrestataireChecklist = async (prestataireId) => {
  const query = `
    SELECT task_id, task_name
    FROM ChecklistTasks
    WHERE Prestataire_id = ?
  `;
  const [rows] = await db.execute(query, [prestataireId]);
  return rows;
};

// Supprimer une tâche de la checklist
const deletePrestataireChecklist = async (taskId) => {
  const query = `
    DELETE FROM ChecklistTasks
    WHERE task_id = ?
  `;
  const [result] = await db.execute(query, [taskId]);
  return result;
};

module.exports = {
         getPrestataireChecklist,
         AddPrestataireChecklist,
         deletePrestataireChecklist,
};
