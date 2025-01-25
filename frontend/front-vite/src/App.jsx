import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createRoot } from 'react-dom/client';
import LogIn from "./account/LogIn";
import SignUp from "./account/SignUp";
import SignUpClient from "./account/SignUpClient";
import SignUpPrestataire from "./account/SignUpPrestataire";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import Service from "./votreService/Service";
import CheckList from "./CheckList";
import AddService from "./votreService/AddService";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/footer";
import ProfileInfos from "./Components/ProfileDetailCompo/profileInfos/profileInfos";
import DetailPres from "./Components/ProfileDetailCompo/profileInfos/detailSlideBar/detailPrest";
import DemandeDevis from "./Components/ProfileDetailCompo/demandeDevis/demandeDevis";
import Comments from "./Components/ProfileDetailCompo/profileInfos/Comments/Comment";
import CommentRating from "./Components/ProfileDetailCompo/commentRatingPopups/Commentrating";
import Galery from "./Components/ProfileDetailCompo/profileInfos/Galery/Galery";
import Detailedprofile from "./Pages/DetailedProfile";
import ProfileCards from "./Components/searchPrestataire/ProfileCards";
import SearchBar from "./Components/searchPrestataire/searchPrest";
import SearchPage from "./Pages/SearchPage";
import AdminComments from "./Components/AdminComments/AdminComments";
import WelcomePage from "./Pages/WelcomePage";
import CalendarUser from "./Components/ProfileDetailCompo/profileInfos/Calendar/Calendar";
import DetailedProfile from "./Pages/DetailedProfile";
import NosServiceEtTarif from "./Components/ProfileDetailCompo/profileInfos/NosServiceEtTarif/NosServiceEtTarif";
import { useEffect } from "react";
import i18n from "./ComponentsZ/i18n";



function App() {
  
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUpPrestataire" element={<SignUpPrestataire />} />
        <Route path="/SignUpClient" element={<SignUpClient />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Profile/EditProfile" element={<EditProfile />} />
        <Route path="/votreService" element={<Service />} />
        <Route path="/votreService/AddService" element={<AddService />} />
        <Route path="/CheckList" element={<CheckList />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/DetailedProfile" element={<DetailedProfile />} />
      </Routes>
    </div>
  );
}

export default App;
