import React, { useState, useEffect } from "react";
import axios from "axios";

const BlurLayerExample = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  // Récupérer les tâches du prestataire au montage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/checklist"); // L'URL de ton API
        setTasks(response.data.checklistTasks); // Mise à jour de l'état avec les tâches
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
      }
    };
    fetchTasks();
  }, []);

  // Ajouter une nouvelle tâche à la checklist
  const handleAddTask = async () => {
    if (taskName && taskDescription && taskDeadline) {
      try {
        const newTask = {
          task_name: taskName,
          description: taskDescription,
          deadline: taskDeadline,
        };
        await axios.post("http://localhost:5000/api/checklist", newTask); // Envoie les données au backend
        // Réinitialiser les champs après l'ajout
        setTaskName("");
        setTaskDescription("");
        setTaskDeadline("");
        // Rafraîchir la liste des tâches après l'ajout
        const response = await axios.get("http://localhost:5000/api/checklist");
        setTasks(response.data.checklistTasks);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche:", error);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center m-32">
      {/* Background content */}
      <div className="absolute inset-0 bg-amber-50 p-8">
        <h1 className="text-gray-800 text-4xl font-bold">Background Content</h1>
        <a
          href="https://www.example.com"
          className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block"
        ></a>
      </div>

      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm"></div>

      {/* Foreground card */}
      <div className="relative bg-[#D08E70] text-white p-6 rounded-lg shadow-lg max-w-2lg">
        <h2 className="text-xl font-bold mb-4">Checklist personnalisée</h2>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={task.completed}
              />
              {task.task_name}
            </li>
          ))}
        </ul>

        {/* Formulaire pour ajouter une nouvelle tâche */}
        <div className="mt-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nom de la tâche"
            className="p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Description"
            className="p-2 mb-2 w-full"
          />
          <input
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="p-2 mb-4 w-full"
          />
          <button
            onClick={handleAddTask}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Ajouter la tâche
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlurLayerExample;
