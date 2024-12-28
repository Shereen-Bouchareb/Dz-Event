import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/footer'
import ProfileCards from '../Components/searchPrestataire/ProfileCards'
import SearchBar from '../Components/searchPrestataire/searchPrest'
import Img from '../Components/searchPrestataire/searchPic.jpg'


function SearchPage() {
  return (
    <div>
      <Header />
      <div style={{width:"100%" , height:"300px"}}>
        <img src={Img} style={{objectFit:"cover" , width:"100%" , height:"100%"}}/>
      </div>
      <div style={{display:"flex" , justifyContent:"center"}}>
          <SearchBar />
      </div>
      <Footer/>
    </div>
  )
}

export default SearchPage
