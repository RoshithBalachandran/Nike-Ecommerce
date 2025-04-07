import React, { useEffect, useState } from "react";
import "./PageStyles.css";

const ProductsSoldPage = () => {
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((orders) => {
        const productMap = new Map();
        orders.forEach((order) => {
          order.items.forEach((item) => {
            if (!productMap.has(item.name)) {
              productMap.set(item.name, { name: item.name, quantity: 0 });
            }
            productMap.get(item.name).quantity += item.quantity;
          });
        });
        setSoldProducts(Array.from(productMap.values()));
      });
  }, []);

  return (
    <div className="admin-page">
      <h2>Top Selling Products</h2>
      <ul>
        {soldProducts.map((item, idx) => (
          <li key={idx}>
            <strong>{item.name}</strong> - {item.quantity} sold
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsSoldPage;
