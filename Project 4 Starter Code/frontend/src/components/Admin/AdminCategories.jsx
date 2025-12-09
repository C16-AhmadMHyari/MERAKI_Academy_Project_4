import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminCategory from "./AdminCategory";

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Manage Categories</h1>
        <button onClick={() => navigate("/admin/addnewcategory")}>
          ➕ Add New Category
        </button>
      </div>

      {categories.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="card"
              onClick={() => navigate(`/admin/category/${category._id}`)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={category.imgSource}
                alt={category.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  backgroundColor: "#f5f5f5",
                }}
              />
              <h3 style={{ marginBottom: "10px" }}>{category.title}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {category.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <span
            style={{ fontSize: "64px", marginBottom: "20px", display: "block" }}
          >
            📂
          </span>
          <h2 style={{ color: "#999", marginBottom: "20px" }}>
            No Categories Yet
          </h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Start by adding your first category
          </p>
          <button onClick={() => navigate("/admin/addnewcategory")}>
            ➕ Add New Category
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
