import React from "react";
import { Routes, Route } from "react-router-dom";
// import AdminLayout from "./AdminApp";
import Home from "./Home";
import Products from "./Products";
import Categories from "./Categories"
// You can add Settings page later if it exists

const AdminRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/admin" element={<AdminLayout />}> */}
        <Route path="dashboard" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<div>Settings Page Coming Soon</div>} />
      {/* </Route> */}
    </Routes>
  );
};

export default AdminRoutes;
