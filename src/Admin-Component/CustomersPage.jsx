import React, { useEffect, useState } from "react";
import "./PageStyles.css";

const CustomersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="admin-page">
      <h2>Registered Customers</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            {user.firstName} {user.lastName} - <em>{user.email}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;
