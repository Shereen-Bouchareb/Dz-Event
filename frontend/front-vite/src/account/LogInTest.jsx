import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";
import Nav from "../../../components/Nav";
import LoginSh from './LoginSh'
import { useAuth } from "../../../Auth";

import axios from "axios";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const login = async (userData) => {
    try {
      console.log(userData);

      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        userData
      );

      console.log(response.data);
      setToken(response.data.token); // Gérer la réponse du serveur
      navigate("/"); // Redirige vers la page d'accueil après l'inscription réussie
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.response.data.message); // Afficher une alerte en cas d'erreur
    }
  };




  // initial state Start
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // initial state End

  // error msg Start
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // error msg End

  // event handler change Start

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  // event handler change End

  // email validation Start ("type=email" may not be effective in some cases)
  const emailValidation = (Email) => {
    return String(Email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i);
  };
  // email validation End

  // Event handler for form submission Start
  const handleSubmit = (e) => {
    e.preventDefault();
    // let hasErrors = false;


    if (!Email) {
      setErrEmail("Enter the email of the company");
    } else {
      if (!emailValidation(Email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!Password) {
      setErrPassword("Enter your password");
    } else {
      if (Password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
    }
    

    if (
      Email &&
      emailValidation(Email) &&
      Password
    ) {
      // idk i'll see
      LoginSh.email =Email;
      LoginSh.password =Password;
      login(LoginSh);
      clearForm();
    }
  };


  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="hidden">
        <Nav />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 dark:bg-darkMode">
        {/* welcome company */}
        <div className="min-h-[100vh] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-linearGradient-dark hidden sm:flex  justify-center items-center text-white rounded-r-[32px] relative overflow-hidden">
          <div className="w-[73%] md:w-[60%] lg:w-[40%] flex flex-col  items-center ">
            <h2 className="font-extrabold  text-[2.5rem] p-2 z-10">HELLO!</h2>
            <p className="text-center font-bold text-lg z-10">Our client</p>
            {/* blue Circles */}
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-300 to-blue-500 dark:bg-custom-circles-dark h-[180px] w-[180px] left-[-95px] top-[35px]"></div>
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark h-[63px] w-[63px] left-[175px] top-[165px]"></div>
            <div className="absolute rounded-full bg-gradient-to-r  from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark  h-[80px] w-[80px] right-[100px] top-[55px]"></div>
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark h-[73px] w-[73px] left-[95px] bottom-[150px]"></div>
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark h-[120px] w-[120px] right-[60px] top[170px]"></div>
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark h-[100px] w-[100px] right-[-50px] bottom-[80px] "></div>
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark h-[44px] w-[44px] right-[150px] bottom-[130px] "></div>
            <div className="absolute rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:bg-custom-circles-dark h-[150px] w-[150px] left-[-15px] bottom-[-30px]  "></div>
            {/* white circles */}
            <div className="absolute rounded-full bg-white size-[8px] left-[215px] top-[35px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] left-[381px] top-[148px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] left-[87px] top-[250px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] right-[41px] top-[170px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] left-[107px] bottom-[136px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] left-[319px] bottom-[176px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] right-[30px] bottom-[220px]"></div>
            <div className="absolute rounded-full bg-white size-[8px] right-[107px] bottom-[36px]"></div>
          </div>
        </div>
        {/* sign up form column */}
        <form
          action=""
          method=""
          onSubmit={handleSubmit}
          className="min-h-[100vh] flex justify-center items-center relative dark:text-white"
        >
          <div className="flex flex-col  ">
            <h2 className="font-bold  text-[2.5rem]  text-center absolute -top-[-5%] -right-[-50%] translate-x-1/2 translate-y-1/2">
              Login
            </h2>
            <label htmlFor="Email" className="font-bold  mb-2 text-xs">
              <FaCircle className="size-[7px] inline-block mr-1 my-1" /> Email
              <span className="text-red-600">*</span>
            </label>
            <input
              type="e-mail"
              name="Email"
              required
              className="  bg-input-gray mb-4 rounded-[8px] h-[55px] w-[300px] p-5  border-l-4 border-secondary-blue focus:outline-none"
              value={Email}
              onChange={handleEmailChange}
            />
            <label htmlFor="Password" className="font-bold  mb-2 text-xs">
              <FaCircle className="size-[7px] inline-block mr-1 my-1" />
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="Password"
              required
              className="bg-input-gray  mb-4 rounded-[8px] h-[55px] w-[300px] p-5  border-l-4 border-secondary-blue focus:outline-none"
              value={Password}
              onChange={handlePasswordChange}
            />
            <p className="text-sm mt-4">
              You don't have an account?
              <Link to="/SignUp" className="text-blue-500 hover:underline ml-1">
                SIGN UP
              </Link>
            </p>
            <button
              type="submit"
              className="text-center text-sm font-bold h-[60px] w-[160px] tracking-widest bg-main-yellow dark:text-darkMode border-none rounded-[10px] py-2 px-[30px] absolute -bottom-[-15%] -right-[-50%] translate-x-1/2 translate-y-1/2 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;