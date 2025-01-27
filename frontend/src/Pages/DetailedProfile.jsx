import React from 'react'
import Header from '../Components/Header/Header'
import ProfileInfos from '../Components/ProfileDetailCompo/profileInfos/profileInfos';
import DetailPres from '../Components/ProfileDetailCompo/profileInfos/detailSlideBar/detailPrest';
import Footer from '../Components/Footer/footer'

export default function DetailedProfile() {
    return (
        <div className="App">
          <Header/>
          <ProfileInfos/>
          <DetailPres/>
          <Footer/>
        </div>
      );
}
