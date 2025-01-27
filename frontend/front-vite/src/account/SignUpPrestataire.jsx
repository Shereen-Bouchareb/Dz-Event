import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Account from "../assets/Account.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import WilayasData from "../Profile/Wilayas.json";

const SignUpPrestataire = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [errName, setErrName] = useState("");
  const [errFamilyName, setErrFamilyName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [errService, setErrService] = useState("");
  const [errWilaya, setErrWilaya] = useState("");
  const [apiError, setApiError] = useState("");

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

  const handelServiceChange = (e) => {
    setService(e.target.value);
    setErrService("");
  };

  const handelDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handelBioChange = (e) => {
    setBio(e.target.value);
  };
  const handelWilayaChange = (selectedOption) => {
    setWilaya(selectedOption); // The selected option object is passed directly
    setErrWilaya(""); // Clear error
  };

  const handelSubmit = async (e) => {
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
    if (!isPasswordMatch(password, confirmPassword)) {
      setErrConfirmPassword("password incorrect");
    }

    if (!service) {
      setErrService("required");
    }
    if (!wilaya) {
      setErrWilaya("required");
    }
    if (
      name &&
      familyName &&
      email &&
      emailValidation(email) &&
      password &&
      passwordValidation(password) &&
      confirmPassword &&
      isPasswordMatch(password, confirmPassword) &&
      service &&
      wilaya
    ) {
      console.log("logging with name:", name);
      console.log("logging with familyName:", familyName);
      console.log("logging with email:", email);
      console.log("logging with password:", password);
      console.log("Remember me:", confirmPassword);
      console.log("service:", service);
      console.log("description:", description);
      console.log("bio:", bio);
      console.log("wilaya:", wilaya.value);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signup/prestataire",
          {
            firstname: name,
            familyname: familyName,
            email: email,
            password: password,
            role: service,
            jobDescription: description,
            userBio: bio,
            wilaya: wilaya.value,
          }
        );
        if (response.status === 201) {
          navigate("/Profile");
        }
      } catch (err) {
        if (err.response) {
          console.error("Error Response:", err.response.data);
          setApiError(
            err.response.data.message || "Failed to register. Please try again."
          );
        } else if (err.request) {
          console.error("No Response:", err.request);
          setApiError("No response from server. Please check your connection.");
        } else {
          console.error("Error:", err.message);
          setApiError("An unexpected error occurred. Please try again.");
        }
      }
      clearForm();
    }
  };

  const clearForm = () => {
    setName("");
    setFamilyName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setService("");
    setDescription("");
    setBio("");
    setWilaya("");
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
          className="flex justify-center items-center flex-col w-full h-full m-0"
          onSubmit={handelSubmit}
        >
          <h1 className="text-main-brown text-4xl leading-[72px] font-bold ">
            Welcome Cher Prestataire
          </h1>
          <div className="flex m-0">
            <div className="flex  flex-col ">
              <div className="flex items-center">
                <label
                  htmlFor="name"
                  className="  text-[15px] font-medium  mr-3"
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
                className="w-[180px] h-[30px] p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex justify-center  flex-col ml-[35px]">
              <div className="flex items-center">
                <label
                  htmlFor="familyName"
                  className="  text-[15px] font-medium  mr-3"
                >
                  Family name <span className="text-red-600">*</span>
                </label>
                {errFamilyName && (
                  <p className="text-red-500 text-xs">{errFamilyName}</p>
                )}
              </div>

              <input
                id="familyName"
                type="text"
                value={familyName}
                onChange={handelFamilyChange}
                // required
                placeholder="Your Family name"
                className="w-[180px] h-[30px] p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
          <div className="flex justify-center  flex-col  mt-0">
            <div className="flex items-center">
              <label
                htmlFor="email"
                className="  text-[15px] font-medium  mr-3"
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
              className="w-[400px] h-[30px] p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            />
          </div>
          <div className="flex flex-col m-1 justify-start">
            <div className="flex">
              <label
                htmlFor="wilaya"
                className="  text-[15px] font-medium  mr-3 "
              >
                Votre Wilaya
              </label>
              {errWilaya && <p className="text-red-500 text-xs">{errWilaya}</p>}
            </div>

            <Select
              id="wilaya"
              value={wilaya}
              options={WilayasData.wilayas.map((wilaya) => ({
                label: wilaya.nom,
                value: wilaya.nom,
                communes: wilaya.communes,
              }))}
              onChange={handelWilayaChange}
              placeholder="Select a country"
              className=" w-[400px]  shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-sm "
            />
          </div>
          <div className="flex justify-center  flex-col">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="  text-[15px] font-medium  mr-3 "
              >
                Your Password <span className="text-red-600">*</span>
              </label>
              {errPassword && (
                <p className="text-red-500 text-xs">{errPassword}</p>
              )}
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={handelPasswordChange}
              // required
              placeholder="------------"
              className="w-[400px] h-[30px]  p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
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
                className="  text-[15px] font-medium mr-3 "
              >
                Re-confirm your password <span className="text-red-600">*</span>
              </label>
              {errConfirmPassword && (
                <p className="text-red-500 text-xs">{errConfirmPassword}</p>
              )}
            </div>
            <input
              id="passwordConfirm"
              type="password"
              value={confirmPassword}
              onChange={handelConfirmPasswordChange}
              // required
              placeholder="------------"
              className="w-[400px] h-[30px]  p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              autoComplete="current-password"
            />
          </div>
          <div className="  flex flex-col  w-[400px] relative ">
            <div className="flex items-center">
              <label
                htmlFor="typeUser"
                className="  text-[15px] font-medium  mr-3"
              >
                Votre Service <span className="text-red-600">*</span>
              </label>
              {errService && (
                <p className="text-red-500 text-xs">{errService}</p>
              )}
            </div>

            <select
              id="typeUser"
              value={service}
              onChange={handelServiceChange}
              className=" relative w-[210px] h-[40px] p-[5px] mb-1  border rounded-md focus:outline-none  shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)] "
            >
              {/* appearance-none */}
              <option value="" disabled className="">
                Selectionner votre service
              </option>
              <option value="photographer">photographer</option>
              <option value="chef">Chef</option>
              <option value="Waiter">Waiter</option>
              <option value="serveur">serveur</option>
            </select>

            <textarea
              value={description}
              onChange={handelDescriptionChange}
              placeholder="Décrivez votre service de manière claire et attractive ..."
              className="w-[400px] h-[50px] mb-1  p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            />
            <input
              type="text"
              value={bio}
              onChange={handelBioChange}
              placeholder="Entrer votre bio"
              className="w-[400px] h-[30px]  p-[5px] gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            />
          </div>
          <div className="flex flex-col mt-[10px]">
            {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
            <button
              type="submit"
              className=" bg-main-brown text-white text-center font-bold w-[400px] h-[40px]  p-[5px]  gap-2 rounded-[5px] focus:outline-none shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]"
            >
              Sign Up
            </button>

            <Link to="/LogIn">
              <div
                href=""
                className="text-main-brown text-[12px] font-medium text-center"
              >
                Already have an account?
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPrestataire;