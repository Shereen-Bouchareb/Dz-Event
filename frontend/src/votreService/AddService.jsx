import { useState, useEffect, useRef } from "react";
import SideBar from "../ComponentsZ/SideBar";
import { TiThMenu } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";

const AddService = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
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

  return (
    <div className="h-screen flex relative">
      {/* SIDEBAR SIDE START  */}
      <div
        className="md:hidden text-main-brown m-[10px] cursor-pointer"
        onClick={toggleSidebar}
      >
        <TiThMenu size={50} />
      </div>
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64   transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
        >
          <SideBar />
        </div>
      )}

      <div className=" hidden md:block md:w-[30%] lg:w-[25%]  h-screen">
        <SideBar />
      </div>
      {/* SIDEBAR SIDE END  */}

      {/* CONTENT SIDE  */}
      <div className=" w-[100%] md:w-[70%] lg:w-[75%] h-screen flex flex-col justify-center items-center">
        <div className="border-[7px] w-[500px] sm:w-[530px] lg:w-[600px] border-text-brown rounded-3xl mb-[40px]">
          <div className="m-4">
            <div className="text-text-brown flex justify-end">
              <button>
                <FaRegTrashAlt size={20} />
              </button>
            </div>
            <div className="text-text-brown font-semibold tracking-widest text-lg m-2 mt-0">
              service title
            </div>
            <div className="text-center m-4 tracking-widest">
              service description...
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-text-brown text-sm p-2">service price</div>
              <div className="bg-text-brown text-main-beige font-semibold p-2 rounded-lg cursor-pointer">
                Edit Service
              </div>
            </div>
          </div>
        </div>
        <form action="">
          <div className="border-2 rounded-2xl border-text-brown ">
            <div>
              <input
                type="text"
                id="title"
                placeholder="Enter Service Name ..."
                className="w-[250px] h-[45px]  p-[10px] m-[30px] mb-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                required
              />
            </div>
            <div>
              <textarea
                type="text"
                id="description"
                placeholder="Enter Service description ..."
                className="w-[250px] h-[45px]  p-[10px] m-[30px] mb-[5px]  mt-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="price"
                placeholder="Enter Service Price ..."
                className="w-[250px] h-[45px]  p-[10px] mt-[0px] m-[30px]  gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                required
              />
            </div>
          </div>
          <div className="text-center text-text-brown mt-[20px] font-semibold">
            <button>Add</button>
          </div>
        </form>
      </div>

      {/* CONTENT SIDE  */}
    </div>
  );
};

export default AddService;
