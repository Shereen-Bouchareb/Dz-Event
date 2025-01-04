import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SideBar from "../ComponentsZ/SideBar";
import { TiThMenu } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import anonymeProfile from "../assets/anonymeProfile.png";
import galleryMen from "../assets/galleryMen.png"
import galleryWedding from "../assets/galleryWedding.png"
import galleryWomen from "../assets/GalleryWomen.png"


const Profile = () => {
  // SIDEBAR START
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
  // SIDEBAR START END

  // CONTENT DATA START
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: anonymeProfile,
    bio: "Respond in less than 48h",
  });
  const [userPictures, setUserPictures] = useState([
    galleryMen,
    galleryWedding,
    galleryWomen,
    galleryMen,
    galleryWedding,
    galleryWomen,
  ]);

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPictures((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePicture = (pictureUrl) => {
    setUserPictures((prev) => prev.filter((pic) => pic !== pictureUrl));
  };
  // CONTENT DATA START

  return (
    <div className="h-screen flex relative">
      {/* SIDEBAR SIDE START  */}
      <div
        className="md:hidden text-main-brown m-[10px] cursor-pointer absolute"
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

      <div className=" hidden md:block md:w-[30%] lg:w-[25%]  h-full ">
        <SideBar />
      </div>
      {/* SIDEBAR SIDE END  */}

      {/* CONTENT SIDE  */}
      <div className="w-[100%] md:w-[70%] lg:w-[75%] h-screen">
        <div className="flex justify-end flex-col items-end mr-5 mt-2 mb-[30px]">
          <div className="size-[66px] relative rounded-full ">
            <img
              src={userInfo.profilePic || anonymeProfile}
              alt="Profile"
              className="size-full rounded-full"
            />
          </div>
          <Link
            to="/Profile/EditProfile"
            className="text-main-brown text-sm font-semibold"
          >
            Edit profile
          </Link>
        </div>
        <div>
          <div className="flex ">
            <h1 className="text-main-brown font-semibold p-[15px] m-5 mr-0">
              Votre Galerie :
            </h1>
            <button className="text-main-brown bg-main-beige font-semibold p-[15px] m-5 ml-3 rounded-3xl relative ">
              ajouter une photo
              <input
              type="file"
              id="addPicture"
              accept="image/*"
              onChange={handleAddPicture}
              className=" cursor-pointer absolute top-0 inset-0 opacity-0"
            />
            </button>
            
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 ml-8">
          {userPictures.map((pic, index) => (
            <div key={index} className="relative group">
              <img
                src={pic}
                alt={`User Picture ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
              <div className="absolute inset-0 rounded-lg bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                <button
                  onClick={() => handleDeletePicture(pic)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      {/* CONTENT SIDE  */}
    </div>
  );
};

export default Profile;
