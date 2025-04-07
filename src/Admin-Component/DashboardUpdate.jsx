import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { message } from "antd";
import "./AddProduct.css";

const DashboardUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((p) => parseInt(p.id) === parseInt(id));
      if (product) {
        setForm(product);
      } else {
        message.error("Product not found.");
      }
      setLoading(false);
    }
  }, [products, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.image.trim()) {
      message.error("All fields are required.");
      return;
    }

    if (isNaN(form.new_price) || isNaN(form.old_price)) {
      message.error("Prices must be valid numbers.");
      return;
    }

    const updatedProduct = {
      ...form,
      id: parseInt(id),
      new_price: parseFloat(form.new_price),
      old_price: parseFloat(form.old_price),
    };

    try {
      const res = await fetch(`http://localhost:3001/all_product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedData = await res.json(); // get server response
      console.log("Server updated product:", updatedData);

      updateProduct({ type: "update", data: updatedData });
      message.success("Product updated successfully!");
      navigate("/admin/dashboard/products");
    } catch (err) {
      console.error("Update error:", err);
      message.error("Failed to update product.");
    }
  };

  if (loading) return <h2>Loading product...</h2>;
  if (!form) return <h2>Product not found!</h2>;

  return (
    <div className="add-product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <input
          name="new_price"
          placeholder="New Price"
          type="number"
          value={form.new_price}
          onChange={handleChange}
          required
        />
        <input
          name="old_price"
          placeholder="Old Price"
          type="number"
          value={form.old_price}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default DashboardUpdate;
