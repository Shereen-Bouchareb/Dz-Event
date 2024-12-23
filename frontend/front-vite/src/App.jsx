import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./account/LogIn";
import SignUp from "./account/SignUp";
import SignUpClient from "./account/SignUpClient";
import SignUpPrestataire from "./account/SignUpPrestataire";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import Service from "./votreService/Service";
import CheckList from "./CheckList";
import AddService from "./votreService/AddService";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpClient" element={<SignUpClient />} />
          <Route path="/SignUpPrestataire" element={<SignUpPrestataire />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/EditProfile" element={<EditProfile />} />
          <Route path="/votreService" element={<Service />} />
          <Route path="/votreService/AddService" element={<AddService />} />
          <Route path="/CheckList" element={<CheckList />} />
          <Route path="/" element={<LogIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
