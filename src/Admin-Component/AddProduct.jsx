import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../Admin-Component/ProductContext";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts, updateProduct } = useContext(ProductContext);
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    new_price: "",
    old_price: "",
    category: "",
    Collection: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit && allProducts.length > 0) {
      const found = allProducts.find((p) => p.id.toString() === id);
      if (found) {
        setFormData({
          name: found.name || "",
          new_price: found.new_price || "",
          old_price: found.old_price || "",
          category: found.category || "",
          Collection: found.Collection || "",
          image: found.image || "",
        });
      }
    }
  }, [allProducts, id, isEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        // Update existing product
        const updatedProduct = { id: Number(id), ...formData };
        const res = await fetch(`http://localhost:3001/all_product/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        });

        if (!res.ok) throw new Error("Failed to update");

        const updatedList = allProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
        updateProduct({ type: "bulk", data: updatedList });
        alert("✅ Product updated!");
      } else {
        // Add new product
        const newProduct = {
          ...formData,
          id: Date.now(), // generate unique ID
        };

        const res = await fetch("http://localhost:3001/all_product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });

        if (!res.ok) throw new Error("Failed to add");

        const addedProduct = await res.json();
        updateProduct({ type: "add", data: addedProduct });
        alert("✅ Product added!");
        navigate("/admin/dashboard/products");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="update-product-container" style={{ padding: "2rem" }}>
      <h2>{isEdit ? "Update Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", display: "flex", flexDirection: "column", gap: "1rem" ,marginLeft:"90px"}}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="number" name="new_price" value={formData.new_price} onChange={handleChange} placeholder="New Price" required />
        <input type="number" name="old_price" value={formData.old_price} onChange={handleChange} placeholder="Old Price" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="Collection" value={formData.Collection} onChange={handleChange} placeholder="Collection" required />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit" style={{ padding: "0.6rem", backgroundColor: "black", color: "white", border: "none" }}>
          {isEdit ? "Update Product" : "Add Product"}
          
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
