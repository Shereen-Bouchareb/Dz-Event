import { useState } from "react";
// import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Account from "../assets/Account.png";

const SignUp = () => {
  const [userRole, setUserRole] = useState("");
  const [errUserRole, setErrUserRole] = useState("");

  const handelUserRoleChange = (e) => {
    setUserRole(e.target.value);
    setErrUserRole("");
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!userRole) {
      setErrUserRole("required");
    }

    if (userRole) {
      console.log(userRole);
      ChangeUrl()
      clearForm();
    }
  };

  const navigate = useNavigate();
  const ChangeUrl =()=>{
    if (userRole == "Client"){
      navigate("/SignUpClient")
    }
    if (userRole == "Prestataire"){
      navigate("/SignUpPrestataire")
    }
  }
  const clearForm = () => {
    setUserRole("");
  };

  return (
    <div className=" h-screen grid grid-cols-1 custom-screen:grid-cols-2">
      <div className="h-screen hidden custom-screen:block">
        <img src={Account} alt="Account picture" className="w-full h-full" />
      </div>
      <div className="bg-main-beige  h-screen ">
        <form
          action=""
          method=""
          className="flex justify-center items-center flex-col w-full h-full"
          onSubmit={handelSubmit}
        >
          <h1 className="text-main-brown text-4xl leading-[72px] font-bold mb-[20px]">
            Sign Up
          </h1>
          <div className="m-[20px]   flex flex-col  w-[400px] relative ">
            <div className="flex items-center">
            <label
              htmlFor="typeUser"
              className="  text-[15px] font-medium leading-[30px] mr-3"
            >
              Your Role
            </label>
            {errUserRole && (
              <p className="text-red-500 text-xs">{errUserRole}</p>
            )}
            </div>
            

            <select
              id="typeUser"
              value={userRole}
              onChange={handelUserRoleChange}
              //   className="w-[400px] h-[50px] p-[20px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              className=" relative w-[210px] h-[50px] p-[10px]   border rounded-md focus:outline-none  shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)] focus:ring-2 focus:ring-main-brown"
            >
              {/* appearance-none */}
              <option value="" disabled>
                Select Your Role
              </option>
              <option value="Client">Client</option>
              <option value="Prestataire">Prestataire</option>
            </select>
            {/* <span className="absolute w-4 h-3 left-[165px] top-[60%] transform -translate-y-1/2 text-black ">
            <RiArrowDropDownLine size={30} />
  </span> */}
          </div>

          <div className="flex   flex-col">
          
            <button
              type="submit"
              className=" bg-main-brown text-white text-center font-bold w-[400px] h-[50px]  p-[10px] mt-[30px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            >
              Next
            </button>
           

            <Link
              to="/Login"
              className="text-main-brown text-[12px] font-medium text-center"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
