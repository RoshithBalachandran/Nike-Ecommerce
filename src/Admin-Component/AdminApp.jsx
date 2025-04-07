import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import './AdminApp.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleNavigation = {
    dashboard: () => navigate("/admin/dashboard"),
    products: () => navigate("/admin/dashboard/products"),
    categories: () => navigate("/admin/dashboard/categories"),
    Orders: () => navigate("/admin/dashboard/orders"),
  };

  return (
    <div className="admin-app">
      <div className="admin-layout">
        <SideBar onNavigate={handleNavigation} />
        <div className="admin-content">
          <Outlet /> {/* This is where nested routes like Products, Orders, etc. will render */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;



