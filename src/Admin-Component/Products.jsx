import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import "./Products.css";

const Products = () => {
  const { products, updateProduct } = useContext(ProductContext);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/all_product/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      const updatedList = products.filter((item) => item.id !== id);
      updateProduct({ type: "bulk", data: updatedList });
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product!");
    }
  };

  return (
    <div className="products-container">
      <h2>Product Inventory</h2>
      <Link to="/admin/addproduct">
  <button className="add-product-btn">Add Product</button>
</Link>

      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>New Price</th>
              <th>Old Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} className="product-img" />
                </td>
                <td>{product.name}</td>
                <td>₹{product.new_price}</td>
                <td className="old-price">₹{product.old_price}</td>
                <td>{product.category}</td>
                <td>
                  <div className="action-buttons">
                  <Link to={`/admin/dashboardupdate/${product.id}`}>

                      <button className="update-btn">Update</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
