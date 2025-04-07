import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Home.css";

const Home = () => {
  const [processedData, setProcessedData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 5, behavior: "smooth" });

    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);

        const productMap = new Map();
        orders.forEach((order) => {
          order.items.forEach((item) => {
            if (!productMap.has(item.name)) {
              productMap.set(item.name, { name: item.name, quantity: 0 });
            }
            productMap.get(item.name).quantity += item.quantity;
          });
        });

        setProcessedData(Array.from(productMap.values()));
      })
      .catch((err) => console.error("Error loading orders:", err));

    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const renderDetail = () => {
    const handleClose = () => setSelectedCard("");

    return (
      <div className="details-card">
        <div className="details-header">
          <h4>
            {selectedCard === "PRODUCTS SOLD" && "Top Selling Products"}
            {selectedCard === "CUSTOMERS" && "Registered Customers"}
            {selectedCard === "CATEGORIES" && "Available Categories"}
            {selectedCard === "ALERTS" && "Alerts"}
          </h4>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        <div className="details-content">
          {selectedCard === "PRODUCTS SOLD" && (
            <ul>
              {processedData.map((p, idx) => (
                <li key={idx}>{p.name} - {p.quantity} sold</li>
              ))}
            </ul>
          )}
          {selectedCard === "CUSTOMERS" && (
            <ul>
              {users.map((u, idx) => (
                <li key={idx}>{u.firstName} {u.lastName} - {u.email}</li>
              ))}
            </ul>
          )}
          {selectedCard === "CATEGORIES" && (
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Collection</li>
            </ul>
          )}
          {selectedCard === "ALERTS" && (
            <p>No alerts yet. Everything looks good!</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Dashboard</h3>
      </div>

      <div className="main-cards">
        <div className="card" onClick={() => setSelectedCard("PRODUCTS SOLD")}>
          <div className="card-inner">
            <h3>PRODUCTS SOLD</h3>
            <BsFillArchiveFill className="card_icons" />
          </div>
          <h1>{processedData.reduce((acc, item) => acc + item.quantity, 0)}</h1>
        </div>

        <div className="card" onClick={() => setSelectedCard("CATEGORIES")}>
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icons" />
          </div>
          <h1>4</h1>
        </div>

        <div className="card" onClick={() => setSelectedCard("CUSTOMERS")}>
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icons" />
          </div>
          <h1>{users.length}</h1>
        </div>

        <div className="card" onClick={() => setSelectedCard("ALERTS")}>
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icons" />
          </div>
          <h1>0</h1>
        </div>
      </div>

      {selectedCard && (
        <div className="card-details-section">
          {renderDetail()}
        </div>
      )}

      <div className="charts-container">
        <div className="chart-card">
          <h3>Cart Overview (Total Products Sold)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#4CAF50" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default Home;
