import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);

  const product = products.find((p) => p.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: "",
    new_price: "",
    old_price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    // 🔼 Scroll to top on component mount
    window.scrollTo(0, 0);

    if (product) {
      setFormData({
        name: product.name,
        new_price: product.new_price,
        old_price: product.old_price,
        category: product.category,
        image: product.image,
      });
    }
  }, [product]);

  if (!product) {
    return <div className="edit-product-container">Product not found!</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({ ...formData, id: parseInt(id) });
    navigate("/admin/products");
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product: {product.name}</h2>
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>New Price:</label>
        <input
          type="number"
          name="new_price"
          value={formData.new_price}
          onChange={handleChange}
        />

        <label>Old Price:</label>
        <input
          type="number"
          name="old_price"
          value={formData.old_price}
          onChange={handleChange}
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
