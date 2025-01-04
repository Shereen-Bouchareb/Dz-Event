import React from 'react'
import NavBar from '../Components/WelcomePageCompo/NavBar/NavBar'
import Hero from '../Components/WelcomePageCompo/Hero/Hero'
import Title from '../Components/WelcomePageCompo/Title/Title'
import YourRole from '../Components/WelcomePageCompo/YourRole/YourRole'
import About from '../Components/WelcomePageCompo/About/About'
import Galery from '../Components/WelcomePageCompo/Galery/Galery'
import Footer from '../Components/Footer/footer'

export default function WelcomePage() {
    console.log("WelcomePage loaded");
  return (
    <div>
      <NavBar/>
      <Hero/>
      <div style={{marginTop:"150px" , marginBottom:"200px"}}>
      <Title title='our Services' subTitle='What We Offer' />
      <YourRole/>
      </div>
      <div style={{marginBottom:"200px"}}>
      <About/>
      </div>
      <Footer/>
      
      
    </div>
  )
}
