import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SideBar from "../ComponentsZ/SideBar";
import { TiThMenu } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";

const Service = () => {
  // SIDEBAR SIDE START
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  // SIDEBAR SIDE END

  // CONTENT SIDE START
  const [ServiceData, SetServiceData] = useState([
    {
      title: "Event Photography",
      description:
        "Professional headshots, personal branding, and individual portrait sessions tailored to capture your unique personality.",
      price: "500$",
    },
    {
      title: "Portrait photography",
      description:
        "Professional headshots, personal branding, and individual portrait sessions tailored to capture your unique personality.",
      price: "500$",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleDeleteService = (index) => {
    SetServiceData((prevService) => prevService.filter((_, i) => i !== index));
  };

  const handleEditService = (index) => {
    setCurrentService({ ...ServiceData[index], index });
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    SetServiceData((prevService) =>
      prevService.map((service, i) =>
        i === currentService.index ? { ...currentService } : service
      )
    );
    setIsEditing(false);
    setCurrentService(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService((prev) => ({ ...prev, [name]: value }));
  };

  // CONTENT SIDE END

  return (
    <div className="h-screen flex relative">
      {/* SIDEBAR SIDE START */}
      <div
        className="md:hidden text-main-brown m-[10px] cursor-pointer absolute"
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
      <div className="w-[100%] md:w-[70%] lg:w-[75%] h-screen flex flex-col">
        <div className="m-auto flex flex-col justify-center items-center gap-3">
          {ServiceData.map((service, index) => (
            <div
              key={index}
              className="border-[7px] w-[500px] sm:w-[530px] lg:w-[600px] border-text-brown rounded-3xl"
            >
              <div className="m-4">
                <div className="text-text-brown flex justify-end">
                  <button onClick={() => handleDeleteService(index)}>
                    <FaRegTrashAlt size={20} />
                  </button>
                </div>
                <div className="text-text-brown font-semibold tracking-widest text-lg m-2 mt-0">
                  {service.title}
                </div>
                <div className="text-center m-4">{service.description}</div>
                <div className="flex justify-between text-sm">
                  <div className="text-text-brown text-sm p-2">
                    Starting at {service.price}
                  </div>
                  <div
                    className="bg-text-brown text-main-beige font-semibold p-2 rounded-lg cursor-pointer"
                    onClick={() => handleEditService(index)}
                  >
                    Edit Service
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-text-brown font-semibold flex justify-end mr-5 mb-3">
          <Link to="/votreService/AddService" className="flex">
            Add a new service
            <div className="size-[25px] border-2 border-text-brown rounded-full text-2xl ml-2 flex items-center justify-center">
              +
            </div>
          </Link>
        </div>
      </div>
      {/* CONTENT SIDE */}

      {/* EDIT POP-UP */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Edit Service</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={currentService.title}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Service Title"
              />
              <textarea
                name="description"
                value={currentService.description}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Service Description"
              />
              <input
                type="text"
                name="price"
                value={currentService.price}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Service Price"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-text-brown text-main-beige p-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
