import React from 'react'
import './Hero.css'
import Balon from './balon.jpg'
import Darkarow from './dark-arrow.png'


const Hero = () => {
  return (
    <div className='hero container'> {/*here we are use the same class name that we aready use fo the nav container in the index css (adding padding)*/}
      <div className='hero-text'>
        <h1 style={{color:"#F0E5CF"}}>Simplifiez l'organisation de vos événements avec les meilleurs prestataires en un clic !</h1>
        <p> we are here to create the new generation for better future many of innovation and fun and easy life by enpower te students with the knowleges and skills </p>
        <button className='btn' style={{backgroundColor:"#D08E70" , color:"white"}}>Explore More</button>
      </div>
    </div>
  )
}

export default Hero