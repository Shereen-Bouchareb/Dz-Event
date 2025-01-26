import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Assurez-vous que l'URL correspond à votre backend
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Si vous utilisez un token d'authentification
  },
});

export const getChecklist = async () => {
  try {
    const response = await api.get("/checklist");
    return response.data.checklistTasks;
  } catch (error) {
    console.error("Erreur lors de la récupération de la checklist:", error);
    return [];
  }
};

export const addChecklistTask = async (task) => {
  try {
    const response = await api.post("/checklist", task);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche:", error);
  }
};

export const deleteChecklistTask = async (taskId) => {
  try {
    const response = await api.delete("/checklist", {
      data: { task_id: taskId },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error);
  }
};
