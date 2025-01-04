import React from 'react'
import './About.css'
import about_img from './AboutUsImage.webp'


function about() {
  return (
    <div className='about container'>
      <div className='about-left'>
        <img src={about_img} alt='' className='about-img'/>
      </div>
      <div className='about-right'>
        <h3>ABOUT DZ EVENT</h3>
        <h2>Connecting clients with top event service providers</h2>
        <p>At DZevent, we connect event planners with top-notch service providers to make every occasion unforgettable.</p>
        <p>Whether you're organizing a wedding, corporate event, party, or any special gathering, our platform makes it easy for you to find and book the best photographers, DJs, caterers, and more. Service providers can showcase their work, attract new clients, and manage bookings effortlessly. With reviews, portfolios, and a seamless booking process</p>
        <p> we ensure that both clients and providers have a smooth, secure, and enjoyable experience. Start planning your next event today with DZevent!</p>
      </div>
    </div>
  )
}

export default about;