import { useState, useEffect, useRef } from "react";
import SideBar from "../ComponentsZ/SideBar";
import WilayasData from "./Wilayas.json";
import anonymeProfile from "../assets/anonymeProfile.png";
import Select from "react-select";
import { TiThMenu } from "react-icons/ti";

const EditProfile = () => {
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

  const [userInfo, setUserInfo] = useState({
    name: "John",
    familyName: "Doe",
    email: "johndoe@example.com",
    bio: "Respond in less than 48h",
    description: "",
    profilePic: "",
    wilaya: null,
    commune: null,
  });

  const [communeOptions, setCommuneOptions] = useState([]);
  const [originalInfo, setOriginalInfo] = useState({ ...userInfo });

  const handleWilayaChange = (selectedOption) => {
    setUserInfo({ ...userInfo, wilaya: selectedOption, commune: null });
    setCommuneOptions(selectedOption ? selectedOption.communes : []);
  };

  const handleCommuneChange = (selectedOption) => {
    setUserInfo({ ...userInfo, commune: selectedOption });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Info:", userInfo);
    setOriginalInfo({ ...userInfo });
    console.log("Updated User Info:", userInfo);
  };

  const handleDiscard = () => {
    setUserInfo({ ...originalInfo });
    setCommuneOptions(originalInfo.country ? originalInfo.country.states : []);
  };

  console.log(WilayasData)
  // CONTENT END

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

      <div className=" hidden md:block md:w-[30%] lg:w-[25%]  h-screen">
        <SideBar />
      </div>
      {/* SIDEBAR SIDE END  */}

      {/* CONTENT SIDE  */}
      <div className="  w-[100%] md:w-[70%] lg:w-[75%] h-screen ">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-end mb-[30px] sm:mb-[10px]">
            <button
              type="button"
              onClick={handleDiscard}
              className="border-none text-red-600 m-[10px] font-semibold"
            >
              Discard
            </button>
            <button
              type="submit"
              className="border-none text-links-blue m-[10px] font-semibold"
            >
              Save Changes
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="size-[96px] relative rounded-full mb-[20px]">
              <img
                src={userInfo.profilePic || anonymeProfile}
                alt="Profile"
                className="size-full rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className=" absolute inset-0 opacity-0 cursor-pointer size-[100px] z-50"
              />
              <span className="bg-blue-200 text-blue-400 absolute bottom-2 right-0 size-[20px]  rounded-full flex justify-center items-center">
                {" "}
                +{" "}
              </span>
            </div>
            <div className="flex flex-col m-1">
              <label
                htmlFor="nom"
                className="text-[15px] font-medium leading-[30px] mr-3 "
              >
                Votre Nom
              </label>
              <input
                type="text"
                id="nom"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-[400px] h-[45px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                required
              />
            </div>
            <div className="flex flex-col m-1">
              <label
                htmlFor="prenom"
                className="text-[15px] font-medium leading-[30px] mr-3 "
              >
                Votre Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="familyName"
                value={userInfo.familyName}
                onChange={handleChange}
                className="w-[400px] h-[45px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                required
              />
            </div>
            <div className="flex justify-between gap-5 items-center">
              <div className="flex flex-col m-1">
                <label
                  htmlFor="wilaya"
                  className="  text-[15px] font-medium leading-[30px] mr-3 "
                >
                  Votre Wilaya
                </label>
                <Select
                  id="wilaya"
                  value={userInfo.country}
                  options={WilayasData.wilayas.map((wilaya) => ({
                    label: wilaya.nom,
                    value: wilaya.nom,
                    communes: wilaya.communes,
                  }))}
                  onChange={handleWilayaChange}
                  placeholder="Select a country"
                  className="mt-1 w-[200px] "
                />
              </div>
              <div className="flex flex-col m-1">
                <label
                  htmlFor="commune"
                  className="  text-[15px] font-medium leading-[30px] mr-3 "
                >
                  Votre Commune
                </label>
                <Select
                  id="commune"
                  value={userInfo.state}
                  options={communeOptions.map((communes) => ({
                    label: communes,
                    value: communes,
                  }))}
                  onChange={handleCommuneChange}
                  placeholder="Select a state"
                  isDisabled={!communeOptions.length}
                  className="mt-1 w-[180px] ring-offset-main-brown"
                />
              </div>
            </div>
            <div className="flex flex-col m-1">
              <label
                htmlFor="bio"
                className="  text-[15px] font-medium leading-[30px] mr-3 "
              >
                Votre Bio
              </label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={userInfo.bio}
                onChange={handleChange}
                className="w-[400px] h-[45px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex flex-col m-1">
              <label
                htmlFor="description"
                className="  text-[15px] font-medium leading-[30px] mr-3 "
              >
                Texte de description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={userInfo.description}
                onChange={handleChange}
                className="w-[400px] h-[45px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        </form>
      </div>
      {/* CONTENT SIDE  */}
    </div>
  );
};

export default EditProfile;
