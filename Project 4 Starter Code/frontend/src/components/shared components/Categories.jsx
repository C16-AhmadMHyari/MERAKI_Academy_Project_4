import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Categories = () => {
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
      <h1>All Categories</h1>

      {categories.length > 0 ? (
        <div>
          {categories.map((category) => (
            <div
              key={category._id}
              className="card"
              onClick={() => navigate(`/user/category/${category._id}`)}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}>
              <img
                src={category.imgSource}
                alt={category.title} />
              <h3>{category.title}</h3>
              <p>
                {category.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card">
          <span>
            📂
          </span>
          <h2>No Categories Available</h2>
        </div>
      )}
    </div>
  );
};

export default Categories;
