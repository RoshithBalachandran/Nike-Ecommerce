import React, { useEffect, useState } from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortType, setSortType] = useState("default");

  const categories = ["all", "men", "women", "kids", "collection"];

  useEffect(() => {
    fetch("http://localhost:3001/all_product")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory, sortType]);

  const getCategoryCount = (cat) => {
    if (cat === "all") return products.length;
    return products.filter(
      (p) => p.category.toLowerCase() === cat.toLowerCase()
    ).length;
  };

  let filteredProducts = products;

  if (selectedCategory !== "all") {
    filteredProducts = products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (sortType === "priceLow") {
    filteredProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortType === "priceHigh") {
    filteredProducts.sort((a, b) => b.new_price - a.new_price);
  } else if (sortType === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="categories-container">
      <h1>Categories</h1>

      <nav className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category.toUpperCase()} ({getCategoryCount(category)})
          </button>
        ))}
      </nav>

      <div className="sort-section">
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <div className="table-container">
        {filteredProducts.length === 0 ? (
          <p>No products available for this category.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>New Price</th>
                <th>Old Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                      />
                    </Link>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.new_price}</td>
                  <td>
                    <s>₹{product.old_price}</s>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Categories;
