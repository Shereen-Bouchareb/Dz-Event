import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Account from "../assets/Account.png";
import { Link } from "react-router-dom";

const SignUpClient = () => {
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errName, setErrName] = useState("");
  const [errFamilyName, setErrFamilyName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");

  const handelNameChange = (e) => {
    setName(e.target.value);
    setErrName("");
  };
  const handelFamilyChange = (e) => {
    setFamilyName(e.target.value);
    setErrFamilyName("");
  };
  const handelEmailChange = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i);
  };
  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const passwordValidation = (password) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };

  const handelConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };

  const isPasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setErrName("required");
    }
    if (!familyName) {
      setErrFamilyName("required");
    }
    if (!email) {
      setErrEmail("please enter your email ");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("please enter a valid email ");
      }
    }

    if (!password) {
      setErrPassword("please enter your password ");
    } else {
      if (!passwordValidation(password)) {
        setErrPassword("the password must contain more then 6 characters  ");
      }
    }

    if (!confirmPassword) {
      setErrConfirmPassword("please confirm your password ");
    }
    if (!isPasswordMatch(password,confirmPassword)) {
      setErrConfirmPassword("password incorrect");
    }

    if (
      name &&
      familyName &&
      email &&
      emailValidation(email) &&
      password &&
      passwordValidation(password) &&
      confirmPassword &&
      isPasswordMatch(password,confirmPassword)
    ) {
      console.log("logging with name:", name);
      console.log("logging with familyName:", familyName);
      console.log("logging with email:", email);
      console.log("logging with password:", password);
      console.log("Remember me:", confirmPassword);
      clearForm();
    }
  };

  const clearForm = () => {
    setName("")
    setFamilyName("")
    setEmail("");
    setPassword("");
    setConfirmPassword("")
    
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
          className="flex justify-center items-center flex-col w-full h-full"
          onSubmit={handelSubmit}
        >
          <h1 className="text-main-brown text-4xl leading-[72px] font-bold mb-[20px]">
            Sign Up
          </h1>
          <div className="flex">
            <div className="flex justify-center  flex-col ">
              <div className="flex items-center">
                <label
                  htmlFor="name"
                  className="  text-[15px] font-medium leading-[30px] mr-3"
                >
                  First name <span className="text-red-600">*</span>
                </label>
                {errName && <p className="text-red-500 text-xs">{errName}</p>}
              </div>

              <input
                id="name"
                type="text"
                value={name}
                onChange={handelNameChange}
                // required
                placeholder="Your First name"
                className="w-[180px] h-[40px] p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex justify-center  flex-col m-[20px]">
              <div className="flex items-center">
                <label
                  htmlFor="familyName"
                  className="  text-[15px] font-medium leading-[30px] mr-3"
                >
                  Family name <span className="text-red-600">*</span>
                </label>
                {errFamilyName && <p className="text-red-500 text-xs">{errFamilyName}</p>}
              </div>

              <input
                id="familyName"
                type="text"
                value={familyName}
                onChange={handelFamilyChange}
                // required
                placeholder="Your Family name"
                className="w-[180px] h-[40px] p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
          <div className="flex justify-center  flex-col m-[20px] mt-0">
            <div className="flex items-center">
              <label
                htmlFor="email"
                className="  text-[15px] font-medium leading-[30px] mr-3"
              >
                Your Email-Adress <span className="text-red-600">*</span>
              </label>
              {errEmail && <p className="text-red-500 text-xs">{errEmail}</p>}
            </div>

            <input
              id="email"
              type="email"
              value={email}
              onChange={handelEmailChange}
              // required

              autoComplete="username"
              placeholder="Example: user@gmail.com "
              className="w-[400px] h-[40px] p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            />
          </div>
          <div className="flex justify-center  flex-col">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="  text-[15px] font-medium leading-[30px] mr-3 "
              >
                Your Password <span className="text-red-600">*</span>
              </label>
              {errPassword && <p className="text-red-500 text-xs">{errPassword}</p>}
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={handelPasswordChange}
              // required
              placeholder="------------"
              className="w-[400px] h-[40px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              autoComplete="current-password"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-main-grey text-xs ">
                must contains letters, numbers and special caracters.
              </p>
            </div>
          </div>
          <div className="flex justify-center  flex-col">
            <div className="flex items-center">
              <label
                htmlFor="passwordConfirm"
                className="  text-[15px] font-medium leading-[30px] mr-3 "
              >
                Re-confirm your password <span className="text-red-600">*</span>
              </label>
              {errConfirmPassword && <p className="text-red-500 text-xs">{errConfirmPassword}</p>}
            </div>
            <input
              id="passwordConfirm"
              type="password"
              value={confirmPassword}
              onChange={handelConfirmPasswordChange}
              // required
              placeholder="------------"
              className="w-[400px] h-[40px]  p-[10px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              autoComplete="current-password"
            />
          </div>

          <div className="flex   flex-col">
          <Link to='/SearchPage'> 
            <button
              type="submit"
              className=" bg-main-brown text-white text-center font-bold w-[400px] h-[50px]  p-[10px] mt-[30px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            >
              Sign Up
            </button>
            </Link>
           <Link to='/LogIn'>
            <a
              href=""
              className="text-main-brown text-[12px] font-medium text-center"
            >
              Already have an account?
            </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpClient;