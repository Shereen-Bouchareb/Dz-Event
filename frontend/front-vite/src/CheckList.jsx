import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SideBar from "./ComponentsZ/SideBar";
import { TiThMenu } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";

const CheckList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]); 
  

  const [newTask, setNewTask] = useState("");
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Fetch tasks from the backend
  useEffect(() => {
    
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/checklistTasks" , {
          headers: { Authorization: `Bearer ${token}` },
        }); // Adjust the endpoint accordingly
        setTasks(response.data.checklistTasks); // Access the checklistTasks property
    console.log(response.data.checklistTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    console.log(newTask.trim())
    if (newTask.trim()) {
      try {
        // Add the task to the backend
        await axios.post("http://localhost:3000/checklistTasks", { task_name: newTask},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust the endpoint and payload
        setTasks((prevTasks) => [...prevTasks, newTask.trim()]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/checklistTasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="h-screen flex relative">
      {/* SIDEBAR SIDE START */}
      <div
        className="md:hidden text-main-brown m-[10px] cursor-pointer"
        onClick={toggleSidebar}
      >
        <TiThMenu size={50} />
      </div>
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
        >
          <SideBar />
        </div>
      )}

      <div className="hidden md:block md:w-[30%] lg:w-[25%] h-screen">
        <SideBar />
      </div>
      {/* SIDEBAR SIDE END */}

      {/* CONTENT SIDE */}
      <div className="w-90% md:w-[70%] lg:w-[75%] h-screen flex flex-col justify-center items-center">
        <h1 className="text-main-brown font-semibold text-lg mb-[30px] leading-[30px]">
          Services suplémentaire disponible au choix
        </h1>
        <div className="bg-main-beige rounded-lg flex flex-col p-[20px] pl-[50px] pr-[50px]">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Entrer vos services suplementaire ..."
            className="w-[400px] h-[45px] p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
          />
          <button
            onClick={handleAddTask}
            className="text-main-brown font-semibold m-auto mt-5 leading-[30px]"
          >
            Add
          </button>
        </div>
        <div className="text-text-brown mt-[60px]">
          {tasks.map((task, index) => (
            <div key={index} className="flex justify-between m-3">
              <p>{task}</p>
              <FaRegTrashAlt
                onClick={() => handleDeleteTask(index)}
                className="cursor-pointer text-red-600 hover:text-red-800"
              />
            </div>
          ))}
        </div>
      </div>
      {/* CONTENT SIDE */}
    </div>
  );
};

export default CheckList;
