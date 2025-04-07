import React from "react";
import "./item.css";
import { Link } from "react-router-dom";

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={image}
          alt={name || "Product Image"}
          loading="lazy"
        />
      </Link>
      <p className="item-name">{name || "Unnamed Product"}</p>
      <div className="item-price">
        <div className="item-price-new">₹{Number(new_price || 0).toFixed(2)}</div>
        <div className="item-price-old">
          <s>${Number(old_price || 0).toFixed(2)}</s>
        </div>
      </div>
    </div>
  );
};

export default Item;




