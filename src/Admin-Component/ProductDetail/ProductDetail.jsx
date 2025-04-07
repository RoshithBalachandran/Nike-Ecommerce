import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/all_product/${id}`);
        if (!res.ok) throw new Error("Product not found!");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found!</h2>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>
        <p>Category: {product.category}</p>
        <p>Collection: {product.Collection}</p>
        <p className="price">
          <span className="new">${product.new_price.toFixed(2)}</span>{" "}
          <s className="old">${product.old_price.toFixed(2)}</s>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
