import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "../Pages/ProductCard";
import "./ShopCategory.css";

const ShopCategory = ({ banner, category }) => {
  const { all_product } = useContext(ShopContext);
  
  // Log for debugging
  console.log("All products:", all_product);
  console.log("Category passed:", category);

  // Normalize data for safety
  const filteredProducts = all_product.filter((product) => {
    const productCategory = product?.category?.toLowerCase();
    const selectedCategory = category?.toLowerCase();
    return productCategory === selectedCategory;
  });
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });
    })

  return (
    <div className="shop-category-container">
      <img
        src={banner}
        alt="Banner"
        className="shop-category-banner"
      />

      <h1 className="shop-category-heading">
        {category || "CATEGORY"}
      </h1>

      <div className="shop-category-grid">
        {/* Show loading if no products yet */}
        {all_product.length === 0 ? (
          <p className="shop-category-loading">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) =>
            product && product.id ? (
              <ProductCard key={product.id} product={product} />
            ) : null
          )
        ) : (
          <p className="shop-category-no-product">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
