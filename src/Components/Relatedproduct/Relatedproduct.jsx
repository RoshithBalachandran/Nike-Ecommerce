import React, { useContext } from "react";
import "./Relatedproduct.css";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "../Pages/ProductCard";

const Relatedproduct = ({ category, currentProductId }) => {
  const { all_product } = useContext(ShopContext);

  const related = all_product.filter(
    (item) => item.category === category && item.id !== currentProductId
  );

  return (
    <div className="relatedproduct">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-items">
        {related.slice(0, 4).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Relatedproduct;
