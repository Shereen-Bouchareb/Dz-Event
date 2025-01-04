import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Account from "../assets/Account.png";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [errUserRole, setErrUserRole] = useState("");

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handelEmailChange = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i);
  };

  const handelUserRoleChange = (e) => {
    setUserRole(e.target.value);
    setErrUserRole("");
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("please enter your email");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("please enter a valid email");
      }
    }

    if (!password) {
      setErrPassword("please enter your password");
    }

    if (!userRole) {
      setErrUserRole("required");
    }

    if (email && emailValidation(email) && password && userRole) {
      console.log("logging with email:", email);
      console.log("logging with password:", password);
      console.log("Remember me:", rememberMe);
      clearForm();
    }
  };
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className=" h-screen grid grid-cols-1 custom-screen:grid-cols-2">
      <div className="h-screen hidden custom-screen:block">
        <img src={Account} alt="Account picture" className="w-full h-full" />
      </div>
      <div className="bg-main-beige  h-screen flex justify-center items-center">
        <form
          action=""
          method=""
          onSubmit={handelSubmit}
          className="flex justify-center items-center flex-col w-full h-full"
        >
          <h1 className="text-main-brown text-4xl leading-[72px] font-bold mb-[20px]">
            Log In
          </h1>
          <div className="flex flex-col  w-[400px] relative ">
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
              className=" relative w-[400px] h-[50px] p-[10px]   border rounded-md focus:outline-none  shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)] "
            >
              {/* appearance-none */}
              <option value="" disabled >
                <span style={{color:"#9F9F9F"}}>Select your role</span>
              </option>
              <option value="Client">Client</option>
              <option value="Prestataire">Prestataire</option>
            </select>
            {/* <span className="absolute w-4 h-3 left-[165px] top-[60%] transform -translate-y-1/2 text-black ">
            <RiArrowDropDownLine size={30} />
  </span> */}
          </div>
          <div className="flex justify-center  flex-col ">
            <div className="flex items-center">
              <label
                htmlFor="email"
                className="  text-[15px] font-medium leading-[30px] mr-3"
              >
                Your Email-Address
              </label>

              {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
            </div>

            <input
              id="email"
              type="email"
              // required
              value={email}
              autoComplete="username"
              onChange={handelEmailChange}
              placeholder="Your Email-Address"
              className="w-[400px] h-[50px] p-[10px]  rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            />
          </div>
          <div className="flex justify-center  flex-col">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="  text-[15px] font-medium leading-[30px] mr-3 "
              >
                Your Password
              </label>
              {errPassword && (
                <p className="text-red-500 text-sm">{errPassword}</p>
              )}
            </div>
            <input
              id="password"
              type="password"
              // required
              value={password}
              onChange={handelPasswordChange}
              placeholder="Your Password"
              className="w-[400px] h-[50px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              autoComplete="current-password"
            />
            <div className="flex justify-between items-center mt-1">
              <a href="" className="text-links-blue text-[12px] font-bold ">
                Forgot Password?
              </a>
              <div className="flex ">
                <label
                  htmlFor="checkbox"
                  className="text-main-grey text-[12px] font-bold mr-1"
                >
                  Remember me
                </label>
                <input
                  type="checkbox"
                  id="checkbox"
                  onClick={toggleRememberMe}
                />
              </div>
            </div>
          </div>

          <div className="flex   flex-col">
          <Link to='/SearchPage'>
            <button
              type="submit"
              className=" bg-main-brown text-white text-center font-bold w-[400px] h-[50px]  p-[10px] mt-[30px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            >
              LogIn
            </button>
            </Link>

            <Link
              to="/SignUp"
              className="text-main-brown text-[12px] font-medium text-center"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
