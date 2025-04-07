import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = ({ product }) => {
  return (
    <div className="breadcrum">
      <span>Home</span>
      <img src={arrow_icon} alt=">" />
      <span>Shop</span>
      <img src={arrow_icon} alt=">" />
      <span>{product?.category}</span>
      <img src={arrow_icon} alt=">" />
      <span>{product?.name}</span>
    </div>
  );
};

export default Breadcrums;
