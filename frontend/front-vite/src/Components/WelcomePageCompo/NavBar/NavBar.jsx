import React, { useEffect, useState } from 'react';
import './NavBar.css';
import Logo from './logo.png'
import { Link } from "react-router-dom";


const NavBar = () => {

  const [sticky , setSticky] = useState(false)
  useEffect(()=>{
    window.addEventListener('scroll' , ()=>{
      window.scrollY > 50 ? setSticky(true) : setSticky(false)
    })
  },[]);

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src=''/>
      <ul>
        <li>Home</li>
        <li>Services</li>
        <li>About us</li>
        <li>Compus</li>
        <li>Find service provider</li>
        <li><button className='btn'><Link to='/Login'>Sign In/Up</Link></button></li>{/*the css of the btn i will write it once in the index css file because i wanna all the buttons have the same css */}
      </ul>
    </nav>
  )
}

export default NavBar