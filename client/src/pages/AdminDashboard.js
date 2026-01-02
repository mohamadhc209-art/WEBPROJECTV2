import React from "react";
import { Link } from "react-router-dom";
import "../Styles/admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-cards">
        <Link to="/admin/products" className="admin-card">
          <h3>Manage Products</h3>
          <p>Add, edit or delete products</p>
        </Link>

        <Link to="/admin/orders" className="admin-card">
          <h3>View Orders</h3>
          <p>Check customer orders</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
