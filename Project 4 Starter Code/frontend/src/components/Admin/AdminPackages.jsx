import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPackages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/packages")
      .then((result) => setPackages(result.data.result || []))
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
        <h1>Manage Packages</h1>
        <button onClick={() => navigate("/admin/addnewpackage")}>
          ➕ Add New Package
        </button>
      </div>

      {packages.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {packages.map((element) => (
            <div
              key={element._id}
              className="card"
              onClick={() => navigate(`/admin/package/${element._id}`)}
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
                src={element.imgSource}
                alt={element.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  backgroundColor: "#f5f5f5",
                }}
              />
              <h3 style={{ marginBottom: "10px" }}>{element.title}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {element.description}
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
            📦
          </span>
          <h2 style={{ color: "#999", marginBottom: "20px" }}>
            No Packages Yet
          </h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Start by adding your first package
          </p>
          <button onClick={() => navigate("/admin/addnewpackage")}>
            ➕ Add New Package
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
