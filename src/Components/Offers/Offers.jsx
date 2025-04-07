import React from 'react'
import './Offers.css';
import offerimg from '../Assets/nike-good.webp'

const Offers = () => {
  return (
    <div className='offers'>
      <div className='offers-left'>
        <h1>Exclusive Offers For You</h1>
        
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <img src={offerimg} alt="" className='offerimage'/>
      </div>
      
    </div>
  )
}

export default Offers