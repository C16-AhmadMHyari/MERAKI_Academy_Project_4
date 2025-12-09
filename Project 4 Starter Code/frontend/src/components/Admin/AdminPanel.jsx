import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Categories from "../shared components/Categories";

const AdminPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center", padding: "40px" }}>
        <h1 style={{ marginBottom: "30px" }}>Admin Panel</h1>
        <p style={{ color: "#666", marginBottom: "40px" }}>
          Manage your platform's content and users
        </p>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <button
            onClick={() => navigate("/admin/categories")}
            style={{
              padding: "30px 20px",
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "32px" }}>📂</span>
            <span>Edit Categories</span>
          </button>

          <button
            onClick={() => navigate("/admin/packages")}
            style={{
              padding: "30px 20px",
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "32px" }}>📦</span>
            <span>Edit Packages</span>
          </button>

          <button
            onClick={() => navigate("/admin/allusers")}
            style={{
              padding: "30px 20px",
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "32px" }}>👥</span>
            <span>Users</span>
          </button>

          <button
            onClick={() => navigate("/admin/alldonations")}
            style={{
              padding: "30px 20px",
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "32px" }}>📊</span>
            <span>Donations Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;