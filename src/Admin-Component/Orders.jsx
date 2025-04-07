import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="admin-orders-container">
      <h2>🧾 All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Address</th>
              <th>Pin Code</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td data-label="User">{order.userDetails?.name || "N/A"}</td>
                <td data-label="Address">{order.userDetails?.address || "N/A"}</td>
                <td data-label="Pin Code">{order.userDetails?.pinCode || "N/A"}</td>
                <td data-label="Items">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td data-label="Total">₹{order.total.toFixed(2)}</td>
                <td data-label="Payment">{order.paymentMethod}</td>
                <td data-label="Date">{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
