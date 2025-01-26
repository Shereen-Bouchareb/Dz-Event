import React, { useState, useEffect } from "react";
import {
  getChecklist,
  addChecklistTask,
  deleteChecklistTask,
} from "./services/api"; // Importez les fonctions API

const Checklist = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  // Charger la checklist au montage du composant
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getChecklist();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  // Ajouter une nouvelle tâche
  const handleAddTask = async () => {
    if (taskName) {
      const newTask = { task_name: taskName, description: "", deadline: "" }; // Remplissez les autres champs si nécessaire
      await addChecklistTask(newTask);
      setTaskName("");
      const tasksData = await getChecklist();
      setTasks(tasksData);
    }
  };

  // Supprimer une tâche
  const handleDeleteTask = async (taskId) => {
    await deleteChecklistTask(taskId);
    const tasksData = await getChecklist();
    setTasks(tasksData);
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center m-32">
      <div className="absolute inset-0 bg-amber-50 p-8">
        <h1 className="text-gray-800 text-4xl font-bold">
          Checklist personnalisée
        </h1>
      </div>

      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm"></div>

      {/* Foreground card */}
      <div className="relative bg-[#D08E70] text-white p-6 rounded-lg shadow-lg max-w-2lg">
        <h2 className="text-xl font-bold mb-4">Tâches de la checklist</h2>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={task.completed}
              />
              <span>{task.task_name}</span>
              <button
                onClick={() => handleDeleteTask(task.task_id)}
                className="text-red-500 ml-4"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>

        {/* Ajouter une nouvelle tâche */}
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Ajouter une tâche"
          className="mt-4 p-2"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default Checklist;
