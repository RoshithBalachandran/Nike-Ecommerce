import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { id, name, image, new_price, old_price } = product;

  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card">
        <img src={image} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
        <div className="product-prices">
          <span className="new-price">₹{Number(new_price).toFixed(2)}</span>
          <span className="old-price">₹{Number(old_price).toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

