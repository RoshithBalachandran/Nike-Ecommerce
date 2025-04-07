import React from 'react'
import './Footer.css';
import nikeorg from "../Assets/Nike-br.png";
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatssap_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-log'>
        <img src={nikeorg} alt="" className='Nike-img' />
        <p><i>Nike</i></p>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Product</li>
        <li>Officess</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
            <img src={instagram_icon} alt="" />
        </div>
        <div className='footer-icons-container'>
            <img src={pintester_icon} alt="" />
        </div>
        <div className='footer-icons-container'>
            <img src={whatssap_icon} alt="" />
        </div>
      </div>
      <div className='footer-copyright'>
            <hr/>
            <p>Copyright @ 2024 - All Right Recerved</p>
      </div>
    </div>
  )
}

export default Footer
