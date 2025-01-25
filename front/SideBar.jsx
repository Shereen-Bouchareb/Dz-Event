import { NavLink } from "react-router-dom";
import logo from "../../public/logoDzEvent.png";
import { IoPersonOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsBoxSeam } from "react-icons/bs";
import { RiMessage2Line } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import Translation from "./Translation";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-main-beige h-screen relative">
      <div className="p-[50px] pl-0 pt-[10px] ml-[30px] w-[80%] text-center">
        <img src={logo} alt="our website logo" className="w-full m-auto" />
      </div>
      <div>
        <div>
          <NavLink
            to="/Profile"
            className={({ isActive }) =>
              isActive ? "block  bg-secondary-beige " : "block"
            }
          >
            <div className="flex text-main-brown font-semibold m-[10px] p-[15px] ml-0  pl-[25px] w-full hover:bg-secondary-beige">
              <IoPersonOutline size={20} />
              <p className="ml-[20px]">{t(`Profile`)}</p>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block  bg-secondary-beige " : "block"
            }
          >
            <div className="flex text-main-brown font-semibold m-[10px] p-[15px] ml-0  pl-[25px] w-full hover:bg-secondary-beige">
              <SlCalender size={20} />
              <p className="ml-[20px]">{t(`Votre disponibilité`)}</p>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block  bg-secondary-beige " : "block"
            }
          >
            <div className="flex text-main-brown font-semibold m-[10px] p-[15px] ml-0  pl-[25px] w-full hover:bg-secondary-beige">
              <BsBoxSeam size={20} />
              <p className="ml-[20px]">{t(`Demande de reservation`)}</p>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block  bg-secondary-beige " : "block"
            }
          >
            <div className="flex text-main-brown font-semibold m-[10px] p-[15px] ml-0  pl-[25px] w-full hover:bg-secondary-beige">
              <RiMessage2Line size={20} />
              <p className="ml-[20px]">{t(`Les Avis`)}</p>
            </div>
          </NavLink>

          <NavLink
            to="/votreService"
            className={({ isActive }) =>
              isActive ? "block  bg-secondary-beige " : "block"
            }
          >
            <div className="flex text-main-brown font-semibold m-[10px] p-[15px] ml-0  pl-[25px] w-full hover:bg-secondary-beige">
              <TbChecklist size={20} />
              <p className="ml-[20px]">{t(`Votre Service `)}</p>
            </div>
          </NavLink>
          <NavLink
            to="/CheckList"
            className={({ isActive }) =>
              isActive ? "block  bg-secondary-beige " : "block"
            }
          >
            <div className="flex text-main-brown font-semibold m-[10px] p-[15px] ml-0  pl-[25px] w-full hover:bg-secondary-beige">
              <RiMessage2Line size={20} />
              <p className="ml-[20px]">{t('Votre checklist')}</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div>
        <Translation/>
      </div>
      <div className="absolute bottom-0 flex text-main-brown    mt-[45px]  p-[15px] w-full hover:bg-secondary-beige border-t border-main-grey">
        <IoMdLogOut size={20} />
        <p className="ml-[20px]">{t('Log Out')}</p>
      </div>
    </div>
  );
};

export default SideBar;
