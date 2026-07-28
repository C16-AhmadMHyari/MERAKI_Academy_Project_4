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
      <div>
        <h1>Manage Packages</h1>
        <button onClick={() => navigate("/admin/addnewpackage")}>
          ➕ Add New Package
        </button>
      </div>

      {packages.length > 0 ? (
        <div>
          {packages.map((element) => (
            <div
              key={element._id}
              className="card"
              onClick={() => navigate(`/admin/package/${element._id}`)}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}>
              <img
                src={element.imgSource}
                alt={element.title} />
              <h3>{element.title}</h3>
              <p>
                {element.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card">
          <span>
            📦
          </span>
          <h2>
            No Packages Yet
          </h2>
          <p>
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
