import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Categories from "../shared components/Categories";

const AdminPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card">
        <h1>Admin Panel</h1>
        <p>
          Manage your platform's content and users
        </p>

        <div>
          <button
            onClick={() => navigate("/admin/categories")}>
            <span>📂</span>
            <span>Edit Categories</span>
          </button>

          <button
            onClick={() => navigate("/admin/packages")}>
            <span>📦</span>
            <span>Edit Packages</span>
          </button>

          <button
            onClick={() => navigate("/admin/allusers")}>
            <span>👥</span>
            <span>Users</span>
          </button>

          <button
            onClick={() => navigate("/admin/alldonations")}>
            <span>📊</span>
            <span>Donations Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;