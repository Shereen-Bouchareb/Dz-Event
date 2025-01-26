import React, { useState } from "react";
import "./App.css";

function App() {
  // State pour les tâches de la checklist
  const [tasks, setTasks] = useState([
    "Prises de vue supplémentaires en soirée",
    "Installation d’éclairages spéciaux",
    "Création d’un effet cinématique",
    "Vidéo en coulisses",
    "Courts métrages résumant l’événement",
  ]);

  // Function to toggle checkbox
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold text-gray-800">
          Checklist Personnalisée
        </h1>
        <div className="checklist-container">
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => console.log("Ajouter une tâche")}
        >
          Ajouter une tâche
        </button>
      </header>
    </div>
  );
}

export default App;
