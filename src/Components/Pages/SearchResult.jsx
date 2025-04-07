import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const { all_product } = useContext(ShopContext);
  const searchQuery = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  if (!searchQuery.trim()) {
    return <p>Please enter a search query.</p>;
  }

  if (!all_product || all_product.length === 0) {
    return <p>Product list is empty. Please check your data source.</p>;
  }

  const filteredProducts = all_product.filter((product) =>
    (product.name || "").toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {filteredProducts.length > 0 ? (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product">
                {product.image ? (
                  <img src={product.image} alt={product.name} loading="lazy" />
                ) : (
                  <p>No image available</p>
                )}
                <h3>{product.name}</h3>
                <p><s>₹{(product.old_price ?? 0).toFixed(2)}</s></p>
                <p>₹{(product.new_price ?? 0).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
